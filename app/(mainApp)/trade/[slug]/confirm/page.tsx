import { ClipboardDocumentCheckIcon, CheckCircleIcon, BuildingLibraryIcon } from "@heroicons/react/24/outline";
import InfoConfirm from "./_components/server/infoConfirm";
import { SlugParam } from "@/utils/interfaces";


export default function Page({ params }: SlugParam) {

  const { slug } = params

  return (
    <div>
      <div className="pb-8">
        <h2 className="text-center font-semibold text-lg mb-4">STEPS TO FOLLOW</h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Read the instructions carefully, follow the steps to the letter and you will receive your cryptocurrencies. The creator of the post is not the owner of the private keys, so any misunderstanding, doubt or attempted fraud will be verified by our team and will be granted the right of cryptocurrencies to the beneficiary user.
        </p>
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <BuildingLibraryIcon width={30} height={40}/>
            <div className="pl-2">
              <p className="font-semibold text-sm">Check with your bank if the deposit was made by the buyer</p>
              <p className="text-gray-500 text-sm">You can see the receipt by clicking on "payment receipt"</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <ClipboardDocumentCheckIcon width={30} height={40}/>
            <div className="pl-2">
              <p className="font-semibold text-sm">The deposit has to match "bitcoin value"</p>
              <p className="text-gray-500 text-sm">If you see any problems, do not hesitate to click on "report buyer"</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircleIcon width={35} height={45}/>
            <div className="pl-2">
              <p className="font-semibold text-sm">Click on the "confirm sale" button</p>
              <p className="text-gray-500 text-sm">Ready you have completed the transaction</p>
            </div>
          </div>
        </div>
      </div>
      <InfoConfirm slug={slug} />
    </div>
  );
}