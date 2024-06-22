import { Sale } from "@/utils/interfaces";
import { getSaleOwnerPost } from "@/utils/functions";
import ReportComment from "@/components/client/reportComment";
import Image from "next/image";

interface InfoConfirmProps {
  slug: string;
}

export default async function InfoConfirm({ slug }: InfoConfirmProps) {
  
  const data: Sale = await getSaleOwnerPost(slug);

  if(!data.slug) {
    return <div>No post found</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm">
        <div className="mb-2">
          <strong>Referencia:</strong> { data.reference ? data.reference : <p>N/A</p> }
        </div>
        <div className="mb-2">
          <strong>Banco a transferir:</strong> {data.bankEntity}
        </div>
        <div className="mb-2">
          <strong>Fecha de creación:</strong> {data.created_at ? new Date(data.created_at).toLocaleString() : data.created_at}
        </div>
        <div className="mb-2">
          <strong>Fecha de compra:</strong> {data.buyed_at ? new Date(data.buyed_at).toLocaleString() : data.buyed_at}
        </div>
        <div className="mb-2">
          <strong>Valor de bitcoin:</strong> {data.bitcoin_value}
        </div>
        <div>
          <strong>Número de cuenta:</strong> {data.accountNumber}
        </div>
      </div>
      {data.voucher && (
        <div className="pb-8">
          <strong>Voucher:</strong>
          <div className="mt-2">
            <Image src={`${process.env.NEXT_PUBLIC_MEDIA_API_URL}${data.voucher}`} alt="Voucher" className="w-full h-auto rounded" />
          </div>
        </div>
      )}
      <ReportComment slug={slug} path="confirm"/>
    </div>
  );
}
