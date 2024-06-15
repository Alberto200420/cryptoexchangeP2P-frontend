'use client';

import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import MoonLoader from 'react-spinners/MoonLoader';
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Button from '../../server/button';

interface RegistermodalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  setOpenLogin: (value: boolean) => void;
  setOpenResendActivation: (value: boolean) => void;
}

const Registermodal: React.FC<RegistermodalProps> = ({
  open,
  setOpen,
  setOpenLogin,
  setOpenResendActivation,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    re_password: '',
  });

  const { first_name, last_name, email, password, re_password } = formData;

  const onChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/register', {
      // Esta es la ruta de tu manejador de registro
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        re_password
      }),
    });

    const data = await res.json();
    
    if (res.status !== 200) {
      // Manejar el error
      setLoading(false);
      toast.error(data.error);
    } else {
      toast.success('Please check email to verify account')
      setOpen(false)
      setLoading(false);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-75 transition-opacity bg-gray-500"/>
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg px-4 bg-white dark:bg-gray-800 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:mx-auto sm:w-full sm:max-w-md ">
                  <p className="mb-6 pt-8 text-center text-xl font-circular-bold dark:text-dark-txt">
                  Signup and start trading
                  </p>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="w-full border-t border-gray-300 dark:border-dark-second" />
                    </div>
                    <div className="relative flex justify-center" />
                  </div>
                </div>

                <div className=" sm:mx-auto sm:w-full sm:max-w-md">
                  <div className=" py-8 px-4 sm:px-10">
                    <form onSubmit={onSubmit} className="space-y-3">
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          type="text"
                          name="first_name"
                          value={first_name}
                          onChange={(e) => onChange(e)}
                          required
                          className="text-md duration block w-full border rounded focus:ring-none focus:outline-none border-dark py-3 pl-10 font-circular-light transition ease-in-out dark:bg-dark-second dark:text-dark-txt"
                          placeholder="First name"
                        />
                      </div>

                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          type="text"
                          name="last_name"
                          value={last_name}
                          onChange={(e) => onChange(e)}
                          required
                          className="text-md duration block w-full border rounded focus:ring-none focus:outline-none border-dark py-3 pl-10 font-circular-light transition ease-in-out dark:bg-dark-second dark:text-dark-txt"
                          placeholder="Last name"
                        />
                      </div>

                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => onChange(e)}
                          required
                          className="text-md duration block w-full border rounded focus:ring-none focus:outline-none border-dark py-3 pl-10 font-circular-light transition ease-in-out dark:bg-dark-second dark:text-dark-txt"
                          placeholder="email@example.com"
                        />
                      </div>

                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={password}
                          onChange={(e) => onChange(e)}
                          required
                          className="text-md duration block w-full border rounded focus:ring-none focus:outline-none border-dark py-3 pl-10 font-circular-light transition ease-in-out dark:bg-dark-second dark:text-dark-txt"
                          placeholder="Password"
                        />
                      </div>

                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="re_password"
                          value={re_password}
                          onChange={(e) => onChange(e)}
                          required
                          className="text-md duration block w-full border rounded focus:ring-none focus:outline-none border-dark py-3 pl-10 font-circular-light transition ease-in-out dark:bg-dark-second dark:text-dark-txt"
                          placeholder="Repeat Password"
                        />
                      </div>

                      <div className="">
                        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                          <div className="ml-4 flex-shrink-0">
                            <div className="mt-2 flex">
                              <input
                                className="form-checkbox h-4 w-4 transition duration-150 ease-in-out"
                                type="checkbox"
                                id="show-password"
                                onChange={toggleShowPassword}
                              />
                              <label
                                className="ml-2 flex text-sm leading-5 focus-within:text-blue-800"
                                htmlFor="show-password"
                              >
                                {showPassword ? (
                                  <span className="inline-flex dark:text-dark-txt">
                                    Hide password
                                  </span>
                                ) : (
                                  <span className="inline-flex dark:text-dark-txt">
                                    Show password
                                  </span>
                                )}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        {loading ? (
                          <Button className="w-full" type="button">
                            <MoonLoader loading={loading} size={25} color="#1c1d1f" />
                          </Button>
                        ) : (
                          <Button className="w-full" type="submit">
                            Register
                          </Button>
                        )}
                      </div>
                    </form>
                    <div className="mt-4 flex items-center justify-center">
                      <div className="text-sm">
                        <span className="text-md font-medium dark:text-dark-txt">
                          or{' '}
                        </span>
                        <button
                          onClick={() => {
                            setOpenResendActivation(true);
                            setOpen(false);
                          }}
                          className="text-md font-circular-book font-dark-accent hover:text-blue-600"
                        >
                          Resend activation email
                        </button>
                      </div>
                    </div>
                    <div className="my-2 flex items-center justify-center">
                      <div className="text-sm">
                        <span className="text-md font-base dark:text-dark-txt">
                          Already have an account?{' '}
                        </span>
                        <button
                          onClick={() => {
                            setOpenLogin(true);
                            setOpen(false);
                          }}
                          className="text-md font-circular-book font-dark-accent hover:text-blue-600"
                        >
                          Login
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      By registering you agree to the{' '}
                      <Link href="/privacy" className="font-base  underline">
                        <span>Privacy Policy</span>
                      </Link>{' '}
                      and{' '}
                      <Link href="/terms" className="font-base  underline">
                        <span>Terms of Service</span>
                      </Link>
                      .
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Registermodal;