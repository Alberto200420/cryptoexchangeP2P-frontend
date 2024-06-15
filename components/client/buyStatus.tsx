'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BuyStatus() {
  const router = useRouter()
  useEffect(() => {
    const targetTime = localStorage.getItem('targetTime');
    const slugPurchase = localStorage.getItem('slugPurchase');
    const balanceMXN = localStorage.getItem('balanceMXN');
    
    if (targetTime && slugPurchase) {
      router.replace(`/trade/${slugPurchase}/buy`);
    } else if (balanceMXN && !(targetTime && slugPurchase)) {
      localStorage.removeItem('balanceMXN');
    }
  },[router])

  return <div></div>
}