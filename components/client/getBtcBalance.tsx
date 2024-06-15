'use client';

import { useState, useEffect } from 'react';
import { calcularPrecioBTCenMXN, convertirBTC, getTotalBalanceInBTC } from "@/utils/functions";

interface PropsPage {
  address: string;
  dashboard: boolean;
}

export default function GetBtcBalance({ address, dashboard }: PropsPage) {
  const [balanceBTC, setBalanceBTC] = useState<number | null>(null);
  const [balanceMXN, setBalanceMXN] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const btcPriceMxn = await calcularPrecioBTCenMXN();
        const balanceBTC = await getTotalBalanceInBTC(address);
        const balanceMXN = await convertirBTC(btcPriceMxn, balanceBTC);
        const roundedBalanceMXN = Math.round(balanceMXN);
        if(!dashboard) {
          localStorage.setItem('balanceMXN', JSON.stringify(roundedBalanceMXN));
        }
        setBalanceBTC(balanceBTC);
        setBalanceMXN(roundedBalanceMXN);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const targetTime = localStorage.getItem('targetTime');
    const slugPurchase = localStorage.getItem('slugPurchase');

    let intervalId: NodeJS.Timeout | null = null;

    if (!targetTime && !slugPurchase) {
      fetchData();
      intervalId = setInterval(fetchData, 180000); // 3 minutes
    }

    // Clean up the interval when the component unmounts
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [address]);

  return (
    <div className="sm:w-auto sm:ml-auto text-center">
      {balanceBTC !== null && balanceMXN !== null ? (
        <>
          <p>{balanceBTC} / {balanceMXN} MXN</p>
          <div className="border-b border-black w-full dark:border-white"></div>
          <p>balance</p>
        </>
      ) : (
        <p>Getting balance...</p>
      )}
    </div>
  );
}
