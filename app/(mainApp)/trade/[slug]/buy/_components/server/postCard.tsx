import { NextPage } from 'next';
import { Sale } from "@/utils/interfaces";
import { UserCircleIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import GetBtcBalance from '@/components/client/getBtcBalance';
import BuyTimer from '../client/buyTimer';
interface Props {
  sale: Sale;
}

const PostCard: NextPage<Props> = ({ sale }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-5">
        <div className='flex flex-col sm:flex-row items-center justify-center sm:justify-start'>
          <div className="flex items-center mb-4 sm:mb-0 sm:mr-4">
            <div className="items-center space-x-2 px-3">
              <div className="pl-4">
                <UserCircleIcon height={40} width={40} className="self-center" />
              </div>
              <Link href={`/profile/${sale.user}`} target="_blank" rel="noopener noreferrer" className="space-x-1 text-sm mt-2 flex items-center hover:text-gray-500 hover:border-gray-500 focus:text-gray-500 focus:border-gray-500 border-b border-transparent transition-all duration-300">
                <span>Profile</span>
                <ArrowTopRightOnSquareIcon height={15} width={15} />
              </Link>
            </div>
            <div className="text-sm font-light">
              <p className="break-words">{sale.address}</p>
              <p><strong>Bank to transfer: </strong>{sale.bankEntity}</p>
              <p><strong>Creation date: </strong>{new Date(sale.created_at).toLocaleString()}</p>
              <p><strong>Reference:</strong> {sale.reference ? sale.reference : 'N/A'}</p>
            </div>
          </div>
          <GetBtcBalance address={sale.address} dashboard={false}/>
        </div>
        <div className="border-b border-black w-full dark:border-white my-4"></div>
      </div>
      <BuyTimer slug={sale.slug} accountNumber={sale.accountNumber} address={sale.address}/>
    </>
  );
};

export default PostCard;