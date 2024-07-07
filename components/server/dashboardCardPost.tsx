import GetBtcBalance from '../client/getBtcBalance';
import { FaBtc } from 'react-icons/fa';
import Link from 'next/link';
import { getPostListDashboard } from '@/utils/functions';
import { DashboardListPostProps } from '@/utils/interfaces';

export default async function DashboardCardPost() {
  
  const data: DashboardListPostProps[] = await getPostListDashboard();

  if(!data.length) {
    return(
      <div className="flex justify-center py-10">
        <h1>There are no posts created, create one!!</h1>
        <a
          href="https://chat.whatsapp.com/H67A0A0ZCWHGcjqA3qdy5u"
          className="text-lg font-semibold text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join the WhatsApp community and agree to exchange with another user
        </a>
      </div>
    )
  }

  return (
    <div>
      {data.map((sale) => (
        <Link key={sale.address} href={`/trade/${sale.slug}/buy`}>
          <div className={'flex flex-col sm:flex-row items-center justify-center sm:justify-start hover:bg-gray-100 cursor-pointer px-4 py-2 rounded-md transition-all duration-200'}>
            <div className="flex items-center mb-4 sm:mb-0 sm:mr-4">
              <FaBtc className="text-3xl mr-5" />
              <div className="text-sm font-light">
                <p className="break-words">{sale.address}</p>
                <p><strong>Bank to transfer: </strong>{sale.bankEntity}</p>
                <p><strong>Creation date: </strong>{new Date(sale.created_at).toLocaleString()}</p>
              </div>
            </div>
            <GetBtcBalance address={sale.address} dashboard={true}/>
          </div>
          <div className="border-b border-black w-full dark:border-white"></div>
        </Link>
      ))}
    </div>
  );
};