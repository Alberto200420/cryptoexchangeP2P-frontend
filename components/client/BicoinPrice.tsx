'use client';

import { useEffect, useState } from 'react';
import { FaBtc } from 'react-icons/fa';
import { calcularPrecioBTCenMXN } from '@/utils/functions';

export default function BitcoinPrice() {
  const [bitcoinPrice, setBitcoinPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        let price = await calcularPrecioBTCenMXN();
        setBitcoinPrice(price);
      } catch (error) {
        console.error('Error fetching BTC price:', error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 40000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center p-4">
      <FaBtc className="text-3xl mr-2" />
      <span className="text-2xl font-bold">
        1 = {
        bitcoinPrice !== null 
        ? 
        `${bitcoinPrice.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`
        :
        'Obteniendo precio...'
        }
      </span>
    </div>
  );
};