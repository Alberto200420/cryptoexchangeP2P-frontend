'use client';

import { useState } from 'react';
import { Button } from "@/components/server";
import { activateSale, formCreateSalePost } from "@/utils/functions";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { MoonLoader } from 'react-spinners';
import ModalInfo from '../server/modalInfo';

export default function CreatePost() {

  const [formData, setFormData] = useState({
    bankEntity: '',
    accountNumber: '',
    reference: '',
    privacyPolicy: false,
  });
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<string | null>(null);  // Nuevo estado para address
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await formCreateSalePost(formData);

    if (response.status == 401) {
      toast.error(response.error);
      router.push('/')
      setLoading(false);
    } else if (response.status !== 201) {
      toast.error(response.error)
      setLoading(false);
    } else {
      const address = response.data?.address;
      setAddress(address);
      setIsOpen(true)
      setLoading(false);
      toast.success(response.data);
      /* 
       * Comente este codigo para no crashear el servidor no funciona el time.sleep tengo que
       * migrar a otro tipo de servidor
      
      try {
        const activateResponse = await activateSale(address);
        if (activateResponse.status === 200) {
          if (activateResponse.data?.error) {
            toast.error(activateResponse.data.error);
          } else {
            toast.success('Sale activated successfully');
          }
        } else {
          toast.error(activateResponse.error);
        }
      } catch (error) {
        toast.info((`No olvides mandar el bitcoin que deseas vender a ${address}`))
      }
      */
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Attention</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="bankEntity" className="block text-sm font-medium leading-6 text-gray-900">
                  Name of the bank
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="bankEntity"
                    value={formData.bankEntity}
                    onChange={handleChange}
                    placeholder="Bank of America, BBVA"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="accountNumber" className="block text-sm font-medium leading-6 text-gray-900">
                  Account Number
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="reference" className="block text-sm font-medium leading-6 text-gray-900">
                  Reference
                </label>
                <p className="text-sm leading-6 text-gray-600">
                  Reference that the buyer will use when depositing to your bank account <strong>(optional)</strong>
                </p>
                <div className="mt-2">
                  <input
                    type="text"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    placeholder="15000"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3 mt-2">
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    name="privacyPolicy"
                    type="checkbox"
                    checked={formData.privacyPolicy}
                    onChange={handleChange}
                    required
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor="privacyPolicy" className="font-medium text-gray-900">
                    By selecting this, you agree to our{' '}
                    <a href="#" className="font-semibold text-indigo-600">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          {loading ? (
            <Button type="button">
              <MoonLoader loading={loading} size={25} color="#1c1d1f" />
            </Button>
          ) : (
            <Button type="submit">Create Sale</Button>
          )}
        </div>
      </form>
      
      {/* Renderizar el modal si existe un address */}
      {address && <ModalInfo address={address} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
}
