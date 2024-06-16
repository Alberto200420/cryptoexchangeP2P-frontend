'use client';

import { calcularPrecioBTCenMXN, fetchFastestFee,  } from "@/utils/functions";
import { useState, useEffect } from "react";

export default function HeaderData() {
  const [fees, setFees] = useState<number | null>(null);
  const [bitcoinPrice, setBitcoinPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const fee = await fetchFastestFee();
        let price = await calcularPrecioBTCenMXN();
        setBitcoinPrice(price);
        setFees(fee);
      } catch (error) {
        console.error('Error fetching fees:', error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 50000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-between items-center pb-5">
      <div className="flex flex-col items-start">
        <span className="font-bold">Transaction fee:</span>
        <div className="border-b border-black w-full dark:border-white"></div>
        <span>{fees !== null ? `${fees.toFixed(2)} MXN` : 'Getting fees...'}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-bold">BTC Price:</span>
        <div className="border-b border-black w-full dark:border-white"></div>
        <span>{
        bitcoinPrice !== null 
        ? 
        `${bitcoinPrice.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`
        :
        <p>Getting price...</p>
        }</span>
      </div>
    </div>
  );
}
