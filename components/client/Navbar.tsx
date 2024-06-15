'use client';
import Loginmodal from '@/components/client/navbar/loginModal';
import ThemeSwitch from './themeSwitch';
import { useState } from 'react'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import ForgotPasswordModal from '@/components/client/navbar/ForgotPasswordModal';
import Registermodal from '@/components/client/navbar/RegisterModal';
import Image from 'next/image';
import icon from '../../app/icon.png'
import { FaBtc } from 'react-icons/fa';

export default function Navbar() {

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [openResendActivation, setOpenResendActivation] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setOpenLogin(true)
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="p-4 flex items-center justify-between pt-0">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            className="h-20 w-auto"
            src={icon}
            alt="Logo cryptoexchangep2p"
            priority={true}
          />
        </div>

        {/* Login Text (Centered) */}
        {/* <div className="text-center flex-grow"> */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <form onSubmit={onSubmit}>
              <button type='submit' className="flex items-center hover:text-gray-500 hover:border-gray-500 focus:text-gray-500 focus:border-gray-500 border-b border-transparent transition-all duration-300">
              Launch App
              <ArrowTopRightOnSquareIcon className="h-4 w-4 cursor-pointer ml-1"/>
              </button >
            </form>
          </div>
        {/* </div> */}

        {/* Theme Switch (Right-aligned) */}
        <div className="md:ml-auto">
          {/* Replace with your ThemeSwitch component */}
          {/* <ThemeSwitch /> */}
          <FaBtc className="text-3xl mr-2" />
        </div>
      </nav>
      <Loginmodal 
      open={openLogin}
      setOpen={setOpenLogin}
      setOpenForgotPassword={setOpenForgotPassword}
      setOpenRegister={setOpenRegister}
      />
      <ForgotPasswordModal
        open={openForgotPassword}
        setOpen={setOpenForgotPassword}
        setOpenLogin={setOpenLogin}
      />
      <Registermodal
        open={openRegister}
        setOpenLogin={setOpenLogin}
        setOpen={setOpenRegister}
        setOpenResendActivation={setOpenResendActivation}
      />
    </header>
  );
}