'use client';

import React, { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/server';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { MoonLoader } from 'react-spinners';
import { TakeOffer } from '@/utils/interfaces';

export default function ImageUpload({ slug }: TakeOffer) {
  const [voucher, setVoucher] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setVoucher(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!voucher) {
      toast.error('Please upload a voucher image');
      return;
    }
    setLoading(true);
    const bitcoin_value = localStorage.getItem('balanceMXN')
    if(!bitcoin_value) {
      toast.error('Try again');
      return
    }
    const formData = new FormData();

    formData.append('slug', slug);
    formData.append('bitcoin_value', bitcoin_value);
    formData.append('voucher', voucher);
    
    const res = await fetch('/api/take-offer', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (res.status !== 200) {
      setLoading(false);
      toast.error(data.error);
    } else {
      localStorage.removeItem('targetTime');
      localStorage.removeItem('slugPurchase');
      localStorage.removeItem('balanceMXN');
      router.push('/dashboard/purchases');
      setLoading(false);
      toast.success('Post Buyed');
    }
  };

  const handleCancelOffer = () => {
    localStorage.removeItem('targetTime');
    localStorage.removeItem('slugPurchase');
    localStorage.removeItem('balanceMXN');
    setVoucher(null);
    setPreviewImage(null);
    router.replace('/dashboard');
    toast.success('Offer rejected');
  };

  return (
    <div>
      {voucher ? (
        <div className="col-span-full">
          <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
            Photo
          </label>
          <div className="mt-2 flex items-center gap-x-3">
            {previewImage && (
              <img src={typeof previewImage === 'string' ? previewImage : ''} alt="Uploaded Preview" className="h-12 w-12 object-cover rounded-full" />
            )}
            <button
              type="button"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => {
                setVoucher(null);
                setPreviewImage(null);
              }}
            >
              Change
            </button>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <form onSubmit={onSubmit}>
              {loading ? (
                <Button type="button">
                  <MoonLoader loading={loading} size={25} color="#1c1d1f" />
                </Button>
              ) : (
                <Button type="submit">
                  Send proof of payment
                </Button>
              )}
            </form>
          </div>
        </div>
      ) : (
        <div className="col-span-full">
          <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
            Cover photo
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-semibold text-black dark:text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleImageChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={handleCancelOffer}
            >
              Cancel offer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
