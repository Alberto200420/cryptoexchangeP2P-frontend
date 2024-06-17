import { fetchBTCPrices, calculateAverageUSDPrice, obtenerConversionMedia } from '@/utils/functions';
import { NextResponse } from 'next/server';

export async function GET() {
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
  
      return NextResponse.json({ price: finalAverage });
    } catch (error) {
      console.error('Error al calcular el precio de BTC en MXN:', error);
      return NextResponse.json({ error: 'There was an error with the network request' });
    }
}