import BuyStatus from "@/components/client/buyStatus";
import { BuySell } from "../_components/client";
import HeaderData from "../_components/server/headerData";
import { DashboardCardPost } from "@/components/server";

export default function Page() {

  return(
    <div className="flex h-screen w-full justify-center">
      <div className="w-full max-w-4xl">
        <BuyStatus /> {/* SE ASEGURA QUE NO HAYA POST TOMADOS, SI SI REDIRECCIONA A trade/[slug]/buy */}
        <HeaderData/> {/* OBTIENE LOS FEES */}
        <BuySell>
          <DashboardCardPost/>
        </BuySell>
      </div>
    </div>
  )
}