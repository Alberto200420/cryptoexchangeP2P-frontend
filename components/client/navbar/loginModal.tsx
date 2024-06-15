'use client';

import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/20/solid';
import Button from '../../server/button';
import MoonLoader from 'react-spinners/MoonLoader';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

interface LoginmodalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  setOpenForgotPassword: (value: boolean) => void;
  setOpenRegister: (value: boolean) => void;
}

const Loginmodal: React.FC<LoginmodalProps> = ({
  open,
  setOpen,
  setOpenForgotPassword,
  setOpenRegister,
}) => {

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggleShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const { email, password } = formData;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    setLoading(true);
    // Logica para autenticar
    const res = await fetch('/api/login', {
      // Esta es la ruta de tu manejador de registro
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();

    if (res.status !== 200) {
      // Manejar el error
      setLoading(false);
      toast.error(data.error);
    } else {
      router.push('/dashboard')
      setLoading(false);
      toast.success('Loged in');
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg sm:p-6">
                <div className="sm:mx-auto sm:w-full sm:max-w-md ">
                  <p className="mb-6 pt-8 text-center text-xl font-circular-bold dark:text-dark-txt">
                    Login to your account
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
                          <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={email}
                          required
                          onChange={(e) => onChange(e)}
                          className="text-md duration block w-full border rounded focus:ring-none focus:outline-none border-dark py-3 pl-10 font-circular-light transition ease-in-out dark:bg-dark-second dark:text-dark-txt"
                          placeholder="email@example.com"
                        />
                      </div>

                      <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={password}
                          required
                          onChange={(e) => onChange(e)}
                          className="text-md duration block w-full border rounded focus:ring-none focus:outline-none border-dark py-3 pl-10 font-circular-light transition ease-in-out dark:bg-dark-second dark:text-dark-txt"
                          placeholder="Password"
                        />
                      </div>

                      <div className="mt-2 flex">
                        <input
                          className="form-checkbox h-4 w-4  text-black transition duration-150 ease-in-out"
                          type="checkbox"
                          id="show-password"
                          onChange={toggleShowPassword}
                        />
                        <label
                          className="ml-2 flex text-sm leading-5 text-gray-900 focus-within:text-blue-800"
                          htmlFor="show-password"
                        >
                          {showPassword ? (
                            <span className="inline-flex text-gray-900 dark:text-white">
                              Hide password
                            </span>
                          ) : (
                            <span className="inline-flex text-gray-900 dark:text-white">
                              Show password
                            </span>
                          )}
                        </label>
                      </div>

                      <div>
                        {loading ? (
                          <Button className="w-full" type="button">
                            <MoonLoader loading={loading} size={25} color="#1c1d1f" />
                          </Button>
                        ) : (
                          <Button type="submit" className="w-full">
                            Login
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="text-sm">
                          <span className="text-md font-circular-bookt-dark-txt">or </span>
                          <button
                            onClick={() => {
                              setOpenForgotPassword(true);
                              setOpen(false);
                            }}
                            className="text-md font-circular-book font-dark-accent hover:text-blue-600"
                          >
                            Forgot your password?
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="text-sm">
                          <span className="text-md font-circular-bookdark-txt">
                            Don&apos;t have an account?{' '}
                          </span>
                          <button
                            onClick={() => {
                              setOpenRegister(true);
                              setOpen(false);
                            }}
                            className="underline text-lg font-circular-book font-dark-accent hover:text-blue-600"
                          >
                            Register
                          </button>
                        </div>
                      </div>
                    </form>
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

export default Loginmodal;