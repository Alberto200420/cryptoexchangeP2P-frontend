import { FaBtc } from "react-icons/fa";
import OptionsFunction from "./optionsFunction";
import { Sale } from '@/utils/interfaces';
import { getDashboardOwnertList } from "@/utils/functions";
import JustBalance from "@/components/client/justBlance";

export default async function DetailsDashboard() {

  const data: Sale[] = await getDashboardOwnertList();

  if (data.length === 0) {
    return <div>No post found</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'taked_offer':
        return 'bg-green-300';
      case 'reported':
        return 'bg-red-600';
      case 'bought':
        return 'bg-green-600';
      default:
        return 'bg-blue-500';
    }
  };

  const convertStatus = (status: string) => {
    switch (status) {
      case 'pending':
        return 'PENDING';
      case 'taked_offer':
        return 'OFFER TAKED';
      case 'reported':
        return 'REPORTED';
      case 'bought':
        return 'BOUGTH';
      case 'active':
        return 'ACTIVE';
    }
  };

  return(
    <div>
      {data.map((sale) => (
        <div className="p-4 shadow-md rounded-md max-w-md mx-auto mt-5" key={sale.address}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <FaBtc className="text-black h-8 w-8" />
              <div>
                <div className="text-xs font-medium text-gray-700">no cuenta:</div>
                <div className="text-xs font-medium text-gray-900">{sale.accountNumber}</div>
              </div>
            </div>
            <div>
              <OptionsFunction status={sale.status} address={sale.address} slug={sale.slug} pathFrom="/posts"/>
            </div>
          </div>
          <div className="text-xs mb-2">
            <div><strong>Referencia:</strong> {sale.reference ? sale.reference : <p>N/A</p>}</div>
            <div><strong>Banco:</strong> {sale.bankEntity}</div>
            <div><strong>Address:</strong> {sale.address}</div>
            <div className="flex items-center"><strong>Balance: </strong> <JustBalance address={sale.address} /></div>
            <div><strong>Fecha de creación:</strong> {new Date(sale.created_at).toLocaleString()}</div>
          </div>
          <div className="flex items-center justify-between">
            <div></div>
            <span className={`text-white text-xs py-1 px-2 rounded ${getStatusColor(sale.status)}`}>
              {convertStatus(sale.status)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
