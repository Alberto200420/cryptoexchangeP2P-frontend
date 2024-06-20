'use client'
import { useState, useEffect, Fragment } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { WalletIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { getWallet, withdraw } from '@/utils/functions';
import { Dialog, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react';
import MoonLoader from 'react-spinners/MoonLoader';
import { toast } from 'react-toastify';
import { Button } from '@/components/server';

interface WalletData {
  id: number;
  amountInCrypto: number;
  user: number;
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function Wallet() {
  const [data, setData] = useState<WalletData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [txid, setTxid] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [address, setAddress] = useState('');

  const handleWithdraw = async () => {
    try {
      setLoading(true);
      toast.info('Sending transaction')
      const txid = await withdraw(address);
      if (txid) {
        setLoading(false);
        setTxid(txid);
        toast.success('Transaction sent');
      } else {
        setLoading(false);
        toast.error('Transaction failed: Unknown error');
      }
    } catch (error) {
      if (error instanceof Error) {
        setLoading(false);
        toast.error(`Transaction failed: ${error.message}`);
      } else {
        setLoading(false);
        toast.error('Transaction failed: An unexpected error occurred');
      }
    }
  };

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const walletData = await getWallet();
        setData(walletData);
      } catch (err) {
        setError('Failed to fetch wallet data');
        console.error(err);
      }
    };

    fetchWalletData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div className="flex justify-between items-center border-t border-gray-200 p-4">
       <WalletIcon className="h-6 w-6" aria-hidden="true" />
       <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
    </div>;
  }

  return (
    <div className="flex justify-between items-center border-t border-gray-200 p-4">
      {/* wallet */}
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none">
            <WalletIcon className="h-6 w-6" aria-hidden="true" />
          </MenuButton>
        </div>

        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute bottom-10 left-0 ml-2 w-48 origin-bottom-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
            { data.amountInCrypto ? 
              <div>
                <p className='block w-full px-4 py-2 text-left text-sm'>
                  Bitcoin balance: {data.amountInCrypto}
                </p>
                <MenuItem>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full px-4 py-2 text-left text-sm'
                      )}
                      onClick={() => setModalOpen(true)}
                    >
                      Withdraw
                    </button>
                  )}
                </MenuItem>
              </div>
              : 
              <p className='block w-full px-4 py-2 text-left text-sm'>
                Bitcoin balance: {data.amountInCrypto}
              </p>
            }
            </div>
          </MenuItems>
        </Transition>
      </Menu>

      {/* Modal */}
      <Transition show={modalOpen} as={Fragment}>
        <Dialog className="relative z-10" onClose={() => setModalOpen(false)}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="text-center">
                      <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Enter the recipient address
                      </DialogTitle>
                      {/* <div className="mt-2 text-xs text-gray-500">
                        Note: you will be deducted 1 dollar for using the platform
                      </div> */}
                      <div className="mt-2 text-xs text-gray-500">
                        Note: check transaction fees before sending your bitcoin
                      </div>
                      <div className="mt-3">
                      <input
                        type="text"
                        className="mt-3 block w-full rounded-lg border border-gray-300 bg-white py-1.5 px-3 text-sm"
                        placeholder="bc1qm34lsc65zpw79lxes69zkqmk6ee3ewf0j77s3h"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      </div>
                      { txid ?
                      <div className="mt-4">
                        <a
                          href={`https://mempool.space/tx/${txid}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Transaction on Mempool
                        </a>
                      </div>
                      :
                      <div></div>
                      }
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    {loading ? (
                      <Button type="button">
                        <MoonLoader loading={loading} size={25} color="#1c1d1f" />
                      </Button>
                    ) : (
                      <Button type="button" onClick={handleWithdraw}>
                        Withdraw
                      </Button>
                    )}
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* user */}
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none">
          <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
        </MenuButton>

        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems
            className="absolute bottom-10 right-0 mb-2 w-48 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="py-1">
              <MenuItem>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    Profile
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    Log out
                  </button>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}
