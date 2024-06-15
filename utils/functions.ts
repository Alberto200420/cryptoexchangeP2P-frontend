'use server';

import { cookies } from 'next/headers';
import { FormData } from './interfaces'
import { BTCPrices } from './interfaces';

export async function fetchBTCPrices(): Promise<BTCPrices> {
  const mempoolUrl = 'https://mempool.space/api/v1/prices';
  const coinbaseUrl = 'https://api.coinbase.com/api/v3/brokerage/market/products/BTC-USD';
  const coinloreUrl = 'https://api.coinlore.net/api/ticker/?id=90';
  const cryptocompareUrl = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,MXN';
  const coinmarketcapUrl = 'https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=1&convert=MXN&id=1';

  const headers = {
    'X-CMC_PRO_API_KEY': `${process.env.COIN_MARKET_CAP_API_KEY}`
  };

  let prices: BTCPrices = {
    usdPriceMempool: null,
    priceCoinbase: null,
    priceUsdCoinlore: null,
    usdPriceCryptocompare: null,
    mxnPriceCryptocompare: null,
    priceUsdCoinmarketcap: null,
    priceMxnCoinmarketcap: null
  };

  try {
    const [mempoolResponse, coinbaseResponse, coinloreResponse, cryptocompareResponse, coinmarketcapResponse] = await Promise.all([
      fetch(mempoolUrl),
      fetch(coinbaseUrl),
      fetch(coinloreUrl),
      fetch(cryptocompareUrl),
      fetch(coinmarketcapUrl, { headers })
    ]);

    if (mempoolResponse.ok) {
      const mempoolData = await mempoolResponse.json();
      prices.usdPriceMempool = mempoolData.USD;
    }

    if (coinbaseResponse.ok) {
      const coinbaseData = await coinbaseResponse.json();
      prices.priceCoinbase = parseFloat(coinbaseData.price);
    }

    if (coinloreResponse.ok) {
      const coinloreData = await coinloreResponse.json();
      prices.priceUsdCoinlore = parseFloat(coinloreData[0].price_usd);
    }

    if (cryptocompareResponse.ok) {
      const cryptocompareData = await cryptocompareResponse.json();
      prices.usdPriceCryptocompare = cryptocompareData.USD;
      prices.mxnPriceCryptocompare = cryptocompareData.MXN;
    }

    if (coinmarketcapResponse.ok) {
      const coinmarketcapData = await coinmarketcapResponse.json();
      if (coinmarketcapData.data && coinmarketcapData.data.quote) {
        prices.priceUsdCoinmarketcap = coinmarketcapData.data.quote.USD?.price || null;
        prices.priceMxnCoinmarketcap = coinmarketcapData.data.quote.MXN?.price || null;
      }
    }

  } catch (error) {
    console.error('Error al obtener datos de las APIs:', error);
  }

  return prices;
}

async function calculateAverageUSDPrice(prices: BTCPrices): Promise<number> {
  const { usdPriceMempool, priceCoinbase, priceUsdCoinlore, usdPriceCryptocompare, priceUsdCoinmarketcap } = prices;

  const validPrices = [usdPriceMempool, priceCoinbase, priceUsdCoinlore, usdPriceCryptocompare, priceUsdCoinmarketcap].filter(price => price !== null) as number[];

  if (validPrices.length === 0) {
    throw new Error('No se pudieron obtener precios válidos.');
  }

  const total = validPrices.reduce((acc, price) => acc + price, 0);
  const average = total / validPrices.length;

  return average;
}

export async function obtenerConversionMedia(amount: number): Promise<number> {
  const exchangerateApi = `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/pair/USD/mxn/${amount}`;
  const frankfurter = `https://api.frankfurter.app/latest?amount=${amount}&from=USD&to=MXN`;

  try {
    const [responseExchangerate, responseFrankfurter] = await Promise.all([fetch(exchangerateApi), fetch(frankfurter)]);

    if (!responseExchangerate.ok) throw new Error(`Error en la llamada al API 1: ${responseExchangerate.statusText}`);
    if (!responseFrankfurter.ok) throw new Error(`Error en la llamada al API 2: ${responseFrankfurter.statusText}`);

    const data1 = await responseExchangerate.json();
    const conversionResult1 = data1.conversion_result;

    const data2 = await responseFrankfurter.json();
    const conversionResult2 = data2.rates.MXN;

    const mediaConversion = (conversionResult1 + conversionResult2) / 2;

    return mediaConversion;
  } catch (error) {
    console.error("Error obteniendo las conversiones:", error);
    throw error;
  }
}

export async function calcularPrecioBTCenMXN() {
  try {
    const prices = await fetchBTCPrices();
    const averageUSDPrice = await calculateAverageUSDPrice(prices);
    const conversionMedia = await obtenerConversionMedia(averageUSDPrice);

    if (prices.mxnPriceCryptocompare === null && prices.priceMxnCoinmarketcap === null) {
      throw new Error('No se pudo obtener el precio de BTC en MXN de CryptoCompare y CoinMarketCap.');
    }

    const btcPriceMxnFromAPIs = [prices.mxnPriceCryptocompare, prices.priceMxnCoinmarketcap].filter(price => price !== null) as number[];
    const averageBtcPriceMxnFromAPIs = btcPriceMxnFromAPIs.reduce((acc, price) => acc + price, 0) / btcPriceMxnFromAPIs.length;

    const finalAverage = (conversionMedia + averageBtcPriceMxnFromAPIs) / 2;

    return finalAverage;
  } catch (error) {
    console.error('Error al calcular el precio de BTC en MXN:', error);
    throw error;
  }
}

export async function formCreateSalePost(formData: FormData) {

  const cookieStore = cookies()
  const accessCookie = cookieStore.get('access')?.value

  if (!cookieStore.has('access')) {
    // throw new Error('Credenciales caducadas, intenta iniciar sesión nuevamente');
    throw new Error('Credenciales caducadas intentan iniciar sesión nuevamente');
  }

  // Validar y transformar datos
  const bankEntity = formData.bankEntity.toUpperCase();
  const accountNumber = Number(formData.accountNumber);
  const privacyPolicy = formData.privacyPolicy;
  const reference = formData.reference;

  // Validación adicional
  if (isNaN(accountNumber)) {
    return { error: 'Account number must be a number', status: 400 };
  }

  if (!privacyPolicy) {
    return { error: 'Privacy policy must be accepted', status: 400 };
  }

  const rawFormData = reference
    ? { bankEntity, accountNumber, reference }
    : { bankEntity, accountNumber };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/sale/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessCookie}`
      },
      body: JSON.stringify(rawFormData),
    });

    if (!res.ok) {
      return { error: res.statusText, status: res.status };
    }

    const data = await res.json();
    return { data, status: res.status };

  } catch (error) {
    return { error: 'There was an error with the network request', status: 500 };
  }
}

export async function fetchFastestFee(): Promise<number> {
  // URL de la API de Mempool
  const feesUrl = 'https://mempool.space/api/v1/fees/recommended';

  try {
    // Haciendo la solicitud a la API de Mempool
    const response = await fetch(feesUrl);
    if (!response.ok) {
      throw new Error('Error al obtener datos de la API fees de Mempool');
    }
    const data = await response.json();
    const fastestFeeSatoshi = data.fastestFee;
    const segwitTransaction = 140 * fastestFeeSatoshi;
    const fastestFeeInBTC = 0.00000001 * segwitTransaction;

    // URL de la API de CoinMarketCap para obtener el precio de 1 BTC en MXN
    const conversionUrl = `https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=1&convert=MXN&id=1`;

    // Haciendo la solicitud a la API de CoinMarketCap
    const conversionResponse = await fetch(conversionUrl, {
      headers: {
        'X-CMC_PRO_API_KEY': `${process.env.COIN_MARKET_CAP_API_KEY}`
      }
    });
    if (!conversionResponse.ok) {
      throw new Error('Error al obtener datos de la API de CoinMarketCap');
    }
    const conversionData = await conversionResponse.json();
    const btcPriceInMXN = conversionData.data.quote.MXN.price;

    // Calcular el valor de fastestFeeInBTC en MXN
    const fastestFeeInMXN = fastestFeeInBTC * btcPriceInMXN;

    // Retornar el valor de fastestFee en MXN
    return fastestFeeInMXN;
  } catch (error) {
    console.error('Error al obtener datos de la API:', error);
    throw error; // Re-lanzar el error para que la función de llamada pueda manejarlo
  }
}

export async function convertirBTC(cantidadBTC: number, precioUnitarioBTC: number): Promise<number> {
  const valorConvertido = cantidadBTC * precioUnitarioBTC;
  return valorConvertido;
}

export async function getTotalBalanceInBTC(address: string): Promise<number> {
  try {
    const response = await fetch(`https://mempool.space/api/address/${address}/utxo`);
    
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
      
    const utxos = await response.json();
      
    // Suma todos los valores en satoshis
    const totalSatoshis = utxos.reduce((total: number, utxo: { value: number }) => total + utxo.value, 0);
      
    // Convierte satoshis a BTC (1 BTC = 100,000,000 satoshis)
    const totalBTC = totalSatoshis / 100000000;
      
    return totalBTC;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function validateToken(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/api/jwt/verify/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (res.ok) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
}

export async function activateSale(address: string) {
  const cookieStore = cookies()
  const accessCookie = cookieStore.get('access')?.value

  if (!cookieStore.has('access')) {
    // throw new Error('Credenciales caducadas, intenta iniciar sesión nuevamente');
    throw new Error('Credenciales caducadas intentan iniciar sesión nuevamente');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/sale/active-sale/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessCookie}`
    },
    body: JSON.stringify({ address }),
  });

  const data = await res.json();

  // Handle different response statuses according to backend logic
  if (res.status === 200) {
    if (data.error) {
      return { error: data.error, status: 200 }; // Special case where error is returned but status is 200
    }
    return { data, status: 200 };
  } else if (res.status === 401) {
    return { error: 'Credenciales caducadas, intenta iniciar sesión nuevamente', status: 401 };
  } else if (res.status === 406) {
    return { error: 'El estado de la venta no es pendiente', status: 406 };
  } else if (res.status === 500) {
    return { error: 'Error interno del servidor', status: 500 };
  } else {
    return { error: 'Error desconocido', status: res.status };
  }
}

export async function getPostListDashboard() {
  const cookieStore = cookies()
  const accessCookie = cookieStore.get('access')?.value

  if (!cookieStore.has('access')) {
    // throw new Error('Credenciales caducadas, intenta iniciar sesión nuevamente');
    throw new Error('Credenciales caducadas intentan iniciar sesión nuevamente');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/sale/get-sale-list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessCookie}`
    }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

export async function getDashboardOwnertList() {
  const cookieStore = cookies()
  const accessCookie = cookieStore.get('access')?.value

  if (!cookieStore.has('access')) {
    // throw new Error('Credenciales caducadas, intenta iniciar sesión nuevamente');
    throw new Error('Credenciales caducadas intentan iniciar sesión nuevamente');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/sale/get-dashboard-owned-list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessCookie}`
    }
  });

  if (res.status === 204) {
    return []; // Devuelve un array vacío si no hay contenido
  }

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getPurchasedSalesList() {
  const cookieStore = cookies()
  const accessCookie = cookieStore.get('access')?.value

  if (!cookieStore.has('access')) {
    // throw new Error('Credenciales caducadas, intenta iniciar sesión nuevamente');
    throw new Error('Credenciales caducadas intentan iniciar sesión nuevamente');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/sale/get-purchases-list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessCookie}`
    }
  });

  if (res.status === 204) {
    return []; // Devuelve un array vacío si no hay contenido
  }

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getPostData(slug: string) {
  const cookieStore = cookies()
  const accessCookie = cookieStore.get('access')?.value

  if (!cookieStore.has('access')) {
    // throw new Error('Credenciales caducadas, intenta iniciar sesión nuevamente');
    throw new Error('Credenciales caducadas intentan iniciar sesión nuevamente');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/sale/get?slug=${slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessCookie}`
    },
    cache: 'force-cache', // Forzar el uso de caché
  });
  
  if (!res.ok) {
    // Esto activará el Error Boundary más cercano
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

export async function changeToLooking(slug: string) {
  const cookieStore = cookies()
  const accessCookie = cookieStore.get('access')?.value

  if (!cookieStore.has('access')) {
    throw new Error('Credenciales caducadas intentan iniciar sesión nuevamente');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/sale/looking/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessCookie}`
    },
    body: JSON.stringify({ slug })
  });
  
  if (!res.ok) {
    // Esto activará el Error Boundary más cercano
    throw new Error('Failed to change to looking');
  }

  return res.json();
}

export async function changeToActiveLoop(slug: string) {
  const cookieStore = cookies()
  const accessCookie = cookieStore.get('access')?.value

  if (!cookieStore.has('access')) {
    throw new Error('Credenciales caducadas intentan iniciar sesión nuevamente');
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/sale/loop-change/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessCookie}`
    },
    body: JSON.stringify({ slug })
  });
  
  if (!res.ok) {
    // Esto activará el Error Boundary más cercano
    throw new Error('Failed to active loop');
  }
  return res.json();
}

export async function getSaleOwnerPost(slug: string) {
  const cookieStore = cookies()
  const accessCookie = cookieStore.get('access')?.value

  if (!cookieStore.has('access')) {
    // throw new Error('Credenciales caducadas, intenta iniciar sesión nuevamente');
    throw new Error('Credenciales caducadas intentan iniciar sesión nuevamente');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/sale/get-confirm?slug=${slug}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessCookie}`
    },
    cache: 'force-cache', // Forzar el uso de caché
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export async function reportPost(slug: string, message: string) {
  const cookieStore = cookies();
  const accessCookie = cookieStore.get('access')?.value;

  if (!cookieStore.has('access')) {
    throw new Error('Credenciales caducadas, intenta iniciar sesión nuevamente');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/sale/report/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessCookie}`
    },
    body: JSON.stringify({ slug, message }) // Enviar los datos en el cuerpo de la solicitud
  });

  if (!res.ok) {
    const errorData = await res.json();
    if (res.status === 400) {
      throw new Error('Datos requeridos faltantes');
    } else if (res.status === 401) {
      throw new Error('No está autorizado para reportar esta venta');
    } else if (res.status === 403) {
      throw new Error(`Estado de la venta no válido: ${errorData.error}`);
    } else {
      throw new Error('Error en reportar venta');
    }
  }

  return res.json();
}

export async function confirmBuy(slug: string) {
  const cookieStore = cookies();
  const accessCookie = cookieStore.get('access')?.value;

  if (!accessCookie) {
    throw new Error('Credenciales caducadas, intenta iniciar sesión nuevamente');
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/sale/confirm-buy/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessCookie}`,
    },
    body: JSON.stringify({ slug }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    if (res.status === 401) {
      throw new Error('No autorizado para confirmar esta compra');
    } else if (res.status === 500) {
      throw new Error(`Error del servidor: ${errorData.error}`);
    } else {
       throw new Error('Error en confirmar la compra');
    }
  }

  return await res.json();
}

export async function getWallet() {
  const cookieStore = cookies();
  const accessCookie = cookieStore.get('access')?.value;

  if (!accessCookie) {
    throw new Error('Credenciales caducadas, intenta iniciar sesión nuevamente');
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/wallet/get`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessCookie}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch wallet data: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

interface WithdrawResponse {
  txid?: string[];
  error?: string;
}

export async function withdraw(addressTo: string): Promise<string[]> {
  const cookieStore = cookies();
  const accessCookie = cookieStore.get('access')?.value;

  if (!accessCookie) {
    throw new Error('Credenciales caducadas, intenta iniciar sesión nuevamente');
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/wallet/withdraw/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessCookie}`,
      },
      body: JSON.stringify({ addressTo }),
    });

    if (!res.ok) {
      const errorData: WithdrawResponse = await res.json();
      throw new Error(errorData.error || 'Error desconocido');
    }

    const data: WithdrawResponse = await res.json();
    if (data.txid) {
      return data.txid;
    } else {
      throw new Error('La respuesta no contiene txid');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error en la solicitud de retiro:', error.message);
      throw new Error(`Error en la solicitud de retiro: ${error.message}`);
    } else {
      console.error('Error desconocido en la solicitud de retiro');
      throw new Error('Error desconocido en la solicitud de retiro');
    }
  }
}
