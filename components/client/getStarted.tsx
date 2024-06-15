'use client';
import { useState } from 'react'
import Loginmodal from '@/components/client/navbar/loginModal';
import ForgotPasswordModal from '@/components/client/navbar/ForgotPasswordModal';
import Registermodal from '@/components/client/navbar/RegisterModal';

export default function GetStarted() {

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [openResendActivation, setOpenResendActivation] = useState(false);

  return (
    <div>
      <button type='button' onClick={() => setOpenLogin(true)}
        className='
        focus:ring-none 
        inline-flex 
        items-center
        justify-center 
        text-white
        bg-blue-500 
        hover:bg-blue-600
        dark:bg-dark-primary 
        rounded-lg 
        px-8 
        py-2.5 
        text-lg 
        font-circular-bold
        scale-100
        hover:scale-105
        transition
        duration-300
        ease-in-out'
      >
        Get started
      </button>
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
    </div>
  )
}