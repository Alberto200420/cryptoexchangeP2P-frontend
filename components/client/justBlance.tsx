'use client'

import { calcularPrecioBTCenMXN, convertirBTC, getTotalBalanceInBTC } from "@/utils/functions";
import { useState, useEffect } from 'react';

interface JustBalanceProps {
  address: string;
}

export default function JustBalance({address}: JustBalanceProps) {
  
  const [ btcBalance, setBtcBalance ] = useState(0)
  const [ nxmBalance, setMxnBalance ] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const btcBalance = await getTotalBalanceInBTC(address);
      const btcPriceInMXN = await calcularPrecioBTCenMXN();
      const mxnBalance = await convertirBTC(btcBalance, btcPriceInMXN);
      setBtcBalance(btcBalance);
      setMxnBalance(mxnBalance)
    }

    fetchData();
  }, [address]);

  return <p> {btcBalance} - BTC / {nxmBalance.toFixed(2)} - MXN</p>

}