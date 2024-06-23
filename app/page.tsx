import { BitcoinPrice, Navbar } from "@/components/client";
import bitcoinLogo from '@/components/assets/bitcoin.png'
import Buy from '@/components/assets/Crypto Exchange P2P buy easily.png'
import Sell from '@/components/assets/Crypto Exchange P2P selling.png'
import BuyView from '@/components/assets/Crypto Exchange P2P Buy.png'
import Image from "next/image";
import GetStarted from "@/components/client/getStarted";
import Link from "next/link";
// import { Footer } from "@/components/server";

export default function Page() {
  return (
    <>
      <Navbar/> 
      <main className="">
        <div className="relative isolate px-6 lg:px-8">
          <div className="mx-auto max-w-2xl pt-24 sm:pt-48 lg:pt-36">
          
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                P2P Cryptocurrency Exchange Patform
              </h1>
              <p className="mt-6 text-lg leading-8">
              without high commissions for withdrawing your cryptocurrenies
              </p>
              <p className="text-lg leading-8">
              Find buyers from your country and sell your cryptocurrencies for fiat money
              </p>
              <p className="text-lg leading-8">
              Find sellers from your country and buy cryptocurrencies for fiat money
              </p>
              <p className="text-lg leading-8">
              Buy and sell at market price
              </p>

              {/* Codigo aqui */}
              <div className="my-6">
                <BitcoinPrice />
              </div>

              <div className="mt-10 flex items-center justify-center gap-x-6">
                <GetStarted />
                <Link href="/about" className="text-sm font-semibold leading-6">
                  About  us <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
          {/* SOLOPYTHON VERSION */}
          <div className="overflow-hidden sm:py-32 pt-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
                {' '}
                {/* Added 'items-center' class */}
                <div className="lg:ml-auto lg:pl-4 lg:pt-4">
                  <div className="lg:max-w-lg">
                    <p className="mt-2 text-4xl font-circular-medium tracking-tight sm:text-5xl">
                      Buy cryptocurrencies from Peer to Peer easily and safely
                    </p>
                    <p className="mt-6 text-lg font-circular-book leading-8">
                    1- Decide which cryptocurrency to buy <br />
                    2- Enter deposit <br />
                    3- Wait to receive the cryptocurrencies
                    </p>
                  </div>
                </div>
                <div className="flex items-start justify-end lg:order-first">
                  <Image
                    src={Buy}
                    alt="Comprar bitcoin"
                    className="w-[30rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[37rem]"
                    width={2432}
                    height={1442}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* CRIPTOMONEDAS ADMITIDAS */}
          <div className="text-center py-4">
            <h1 className="text-4xl font-bold pb-8">Supported currencies</h1>

            <div className="flex justify-center items-center">
              <Image
                src={bitcoinLogo}
                alt="Bitcoin Logo"
                width={70}
                height={100}
              />
            </div>
          </div>
          {/* SOLOPYTHON VERSION */}
          <div className="overflow-hidden sm:py-32 pt-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
                {' '}
                {/* Added 'items-center' class */}
                <div className="lg:ml-auto lg:pl-4 lg:pt-4">
                  <Image
                    src={Sell}
                    alt="Product screenshot"
                    className="w-[30rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[37rem]"
                    width={2432}
                    height={1442}
                  />
                </div>
                <div className="flex items-start justify-end lg:order-first">
                  <div className="lg:max-w-lg">
                    <p className="mt-2 text-4xl font-circular-medium tracking-tight sm:text-5xl">
                    Sell cryptocurrencies from Peer to Peer easily and safely
                    </p>
                    <p className="mt-6 text-lg font-circular-book leading-8">
                    1- Decide which cryptocurrency to buy <br />
                    2- Enter deposit <br />
                    3- Wait to receive the cryptocurrencies
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center py-10">
            <a
              href="https://chat.whatsapp.com/H67A0A0ZCWHGcjqA3qdy5u"
              className="text-lg font-semibold text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the WhatsApp community and agree to exchange with another user
            </a>
          </div>
          <div className="pt-20">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 pb-12">
              <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                <svg
                  viewBox="0 0 1024 1024"
                  className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                  aria-hidden="true"
                >
                  <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                  <defs>
                    <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                      <stop stopColor="#7775D6" />
                      <stop offset={1} stopColor="#E935C1" />
                    </radialGradient>
                  </defs>
                </svg>
                <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    The best way to buy and sell.
                    <br />
                    Start using our app today.
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-gray-300">
                  Buy and sell fairly, safely and easily. Find post from the bitcoin community.
                  </p>
                  <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                    < GetStarted />
                    <Link href="/about" className="text-sm font-semibold leading-6 text-white">
                      About us <span aria-hidden="true">→</span>
                    </Link >
                  </div>
                </div>
                <div className="relative mt-16 h-80 lg:mt-8">
                  <Image
                    className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                    src={BuyView}
                    alt="App screenshot"
                    width={1824}
                    height={1080}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Footer/> */}
      </main>
    </>
  );
}
