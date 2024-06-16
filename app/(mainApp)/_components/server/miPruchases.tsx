import { FaBtc } from "react-icons/fa";
import { Sale } from '@/utils/interfaces';
import { getPurchasedSalesList } from "@/utils/functions";
import OptionsFunction from "./optionsFunction";
import ReportComment from "@/components/client/reportComment";

export default async function MiPruchases() {

  const data: Sale[] = await getPurchasedSalesList();

  if (data.length === 0) {
    return <div>No purchases found</div>; // Mensaje más claro
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
      case 'taked_offer':
        return 'Waiting confirmation';
      case 'reported':
        return 'Reported';
      case 'bought':
        return 'Confirmed! check wallet';
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
              <OptionsFunction status={sale.status} address={sale.address} slug={sale.slug} pathFrom="/purchases"/>
            </div>
          </div>
          <div className="text-xs mb-2">
            <div><strong>Referencia:</strong> {sale.reference ? sale.reference : <p>N/A</p>}</div>
            <div><strong>Banco:</strong> {sale.bankEntity}</div>
            <div><strong>Address:</strong> {sale.address}</div>
            <div><strong>Purchase price:</strong> {sale.bitcoin_value} MXN</div>
            <div><strong>Date of purchase:</strong> {sale.buyed_at ? new Date(sale.buyed_at).toLocaleString() : <p>No date</p>}</div>
            {/* <div>{sale.has_comment ? 'TIENE COMENTARIO' : <p> No tiene comentario</p>}</div> */}
          </div>
          <div className="flex items-center justify-between">
            <div></div>
            <span className={`text-white text-xs py-1 px-2 rounded ${getStatusColor(sale.status)}`}>
              {convertStatus(sale.status)}
            </span>
          </div>
          <ReportComment slug={sale.slug} path="purchases"/>
        </div>
      ))}
    </div>
  );
}
