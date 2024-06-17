'use client';

import { useEffect, useState } from 'react';
import { FaBtc } from 'react-icons/fa';
import { calcularPrecioBTCenMXN } from '@/utils/functions';

export default function BitcoinPrice() {
  const [bitcoinPrice, setBitcoinPrice] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const cacheDuration = 5 * 60 * 1000; // 5 minutos en milisegundos

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        // Comprueba si la caché está vigente
        const now = new Date();
        if (lastUpdated && (now.getTime() - lastUpdated.getTime()) < cacheDuration) {
          return;
        }

        let price = await calcularPrecioBTCenMXN();
        setBitcoinPrice(price);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Error fetching BTC price:', error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 5 * 60 * 1000); // 5 minutos

    return () => clearInterval(interval);
  }, [lastUpdated]);

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
