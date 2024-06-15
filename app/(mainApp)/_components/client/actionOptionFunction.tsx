'use client';

import { useRouter } from "next/navigation";
import { activateSale } from "@/utils/functions";
import { toast } from "react-toastify";

interface OptionButtonProps {
  icon: React.ReactNode;
  text: string;
  slug: string;
  status: string;
  address: string;
}

export default function ActionOptionFunction({ icon, text, slug, status, address }: OptionButtonProps) {
  const router = useRouter();

  const handleClick = async () => {
    if (status === 'pending') {
      activateSale(address);
      toast.success('Request sent, we will send you a confirmation email when we receive the bitcoin')
    } else if (status === 'taked_offer' && text === 'Wait for confirmation') {
      toast.info('Wait for the seller to confirm the bank transfer')
    } else if (status === 'taked_offer') {
      router.push(`/trade/${slug}/confirm`);
    }
  };

  return (
    <button
      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-700"
      onClick={handleClick}
    >
      {icon}
      {text}
    </button>
  );
};
