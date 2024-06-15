export interface NavigationItem {
  name: string;
  href: string;
  icon: string;
  current: boolean;
}

export interface FormData {
  bankEntity: string;
  accountNumber: string;
  reference?: string;
  privacyPolicy: boolean;
}

export interface SlugParam {
  params: {
    slug: string;
  };
}

export interface TakeOffer {
  slug: string
  address: string
}

export interface Sale {
  id: number,
  slug: string;
  bankEntity: string;
  status: string;
  created_at: string;
  accountNumber: number;
  reference: string | null;
  address: string;
  buyed_at: string | null;
  bitcoin_value: number | null;
  buyer: string | null;
  user: string;
  has_comment: boolean;
  voucher: string | null;
}

export interface BuyTimerProps {
  slug: string;
  accountNumber: number;
  address: string;
}

export interface BTCPrices {
  usdPriceMempool: number | null;
  priceCoinbase: number | null;
  priceUsdCoinlore: number | null;
  usdPriceCryptocompare: number | null;
  mxnPriceCryptocompare: number | null;
  priceUsdCoinmarketcap: number | null;
  priceMxnCoinmarketcap: number | null;
}

export interface DashboardListPostProps {
  address: string;
  bankEntity: string;
  created_at: string;
  slug: string;
  status: string;
}