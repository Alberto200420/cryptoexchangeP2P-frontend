'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/server';
import { ClockLoader } from 'react-spinners';
import ImageUpload from './imageUpload';
import { toast } from 'react-toastify';
import { BuyTimerProps } from '@/utils/interfaces';
import { changeToActiveLoop, changeToLooking } from '@/utils/functions';

export default function BuyTimer({ slug, accountNumber, address }: BuyTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    let targetDate: number | null = null;
  
    if (timerStarted || (localStorage.getItem('targetTime'))) {
      const targetTime = localStorage.getItem('targetTime');
      targetDate = targetTime ? new Date(targetTime).getTime() : Date.now() + 10 * 60 * 1000;
      localStorage.setItem('targetTime', new Date(targetDate).toString());

      const updateCountdown = () => {
        const currentTime = Date.now();
        const difference = targetDate! - currentTime;

        if (difference <= 0) {
          localStorage.removeItem('targetTime');
          localStorage.removeItem('slugPurchase');
          toast.warning('Time out');
          router.push('/dashboard');
        } else {
          setTimeLeft(difference);
        }
      };

      const intervalId = setInterval(updateCountdown, 1000);

      return () => clearInterval(intervalId);
    }

  }, [timerStarted, router]);

  const formatTimeLeft = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const startTimer = () => {
    const newTargetTime = new Date(Date.now() + 10 * 60 * 1000).toString();
    localStorage.setItem('targetTime', newTargetTime);
    localStorage.setItem('slugPurchase', slug);
    setTimerStarted(true);
  };

  const handleSubmit = async () => {
    try {
      const response = await changeToLooking(slug);
      if (response.status === 304) {
        toast.error('Trade was not activate');
      } else {
        try {
          startTimer()
          changeToActiveLoop(slug);
          toast.success('Offer Taken');
        } catch (error) {
          console.log('error')
        }
      }
    } catch (error) {
      toast.error('Failed to change to looking');
    }
  };

  return (
    <div>
      
      {timeLeft === 0 ? 
      <div className='flex justify-center'>
        <Button onClick={handleSubmit}>Take offer</Button>
      </div>
      :
      <div>
        <div className="flex flex-col items-center justify-center">
          {localStorage.getItem('balanceMXN') ? <div>Ammount to send {localStorage.getItem('balanceMXN')} MXN</div> : <div></div>}
          <div className="mb-5">
          <p className="text-center"><strong>Account Number:</strong> {accountNumber}</p>
          </div>
          <ClockLoader
            color="#36d7b7"
            speedMultiplier={0.10} // Ajuste de velocidad
          />
          <span>{formatTimeLeft(timeLeft)}</span>
        </div>
        <ImageUpload slug={slug} address={address}/>
      </div>
      }
    </div>
  );
}
