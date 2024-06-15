'use client';

import CircleLoader from 'react-spinners/CircleLoader';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface Props {
	params: {
		uid: string;
		token: string;
	};
}

export default function Page({ params }: Props) {
	const router = useRouter();
  const [token, setToken] = useState('');
  const [uid, setUID] = useState('');

  const [effectRegister, setEffectRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const activateAccount = async () => {
    setLoading(true);
    const res = await fetch('/api/activation', {
      // Esta es la ruta de tu manejador de registro
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid,
        token,
      }),
    });

    // We will parse the response only if status is not 204
    if (res.status !== 204) {
      const data = await res.json();
      toast.error('No pudimos activar este pedido, verifica si la cuenta ya esta activa.');
      console.log(data.error);
    } else {
      // Procesar la respuesta de registro exitoso
      toast.success('Tu cuenta ha sido activada, ahora puedes hacer login!');
      router.push('/')
    }
    setLoading(false);
  };

	useEffect(() => {
		const { uid, token } = params;
		if (uid && token !== null) {
      setToken(token);
      setUID(uid);
    }
	}, []);

	return (
    <div className="pt-32  px-4 py-8 sm:px-6">
      <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <h3 className="font-recife-bold text-3xl leading-6 text-gray-900 dark:text-dark-txt">
            Welcome to CryptoExchangep2p.com
          </h3>
          <p className="font-regular mt-2 max-w-4xl text-lg text-gray-900 dark:text-dark-txt-secondary">
            Before you get started please follow this guide.
          </p>
        </div>
        <div>
      {loading ? (
        <div className="text-md relative inline-flex items-center border border-transparent bg-palm-leaf-500 px-4 py-2 font-bold text-white shadow-sm hover:bg-palm-leaf-600 focus:outline-none focus:ring-2 focus:ring-palm-leaf-400 focus:ring-offset-2">
          <CircleLoader loading={loading} size={25} color="#ffffff" />
        </div>
      ) : (
        <button
          type="button"
          onClick={activateAccount}
          onMouseDown={() => {
            setEffectRegister(true);
          }}
          onMouseUp={() => setEffectRegister(false)}
          className={`${
            effectRegister &&
            'duration-400 animate-click hover:translate-x-0.5  hover:translate-y-0.5 hover:shadow-neubrutalism-sm'
          }
                text-md 
                relative
                inline-flex
                w-full 
                items-center
                justify-center 
                border 
                border-dark-bg border-transparent
                bg-green-500  px-4  py-2  text-sm
                font-bold
                text-white shadow-neubrutalism-md transition duration-300 ease-in-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-green-600  hover:shadow-neubrutalism-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2
            `}
        >
          Activate account
        </button>
      )}
    </div>
      </div>
    </div>
	);
}