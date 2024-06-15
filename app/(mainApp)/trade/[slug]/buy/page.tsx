import { CameraIcon, BuildingLibraryIcon, ClockIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { getPostData } from "@/utils/functions";
import { SlugParam } from "@/utils/interfaces";
import PostCard from "./_components/server/postCard";

export default async function Page({ params }: SlugParam) {
  const { slug } = params

  const data = await getPostData(slug)

  return (
    <div>
      <div>
        <h2 className="text-center font-semibold text-lg mb-4">STEPS TO FOLLOW</h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Read the instructions carefully, follow the steps to the letter and you will receive your cryptocurrencies. The creator of the post is not the owner of the private keys, so any misunderstanding, doubt or attempted fraud will be verified by our team and will be granted. the right of cryptocurrencies to the beneficiary user.
        </p>
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <BuildingLibraryIcon width={30} height={40}/>
            <div className="pl-2">
              <p className="font-semibold text-sm">Send by bank transfer with the exact amount to the indicated bank</p>
              <p className="text-gray-500 text-sm">If the post have a reference, make the transfer with that concept</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <CameraIcon width={30} height={40}/>
            <div className="pl-2">
              <p className="font-semibold text-sm">Take a screenshot of the bank transfer and upload it as soon as possible</p>
              <p className="text-gray-500 text-sm">You have 10 minutes to do it otherwise you will be redirected to the main page</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <ClockIcon width={35} height={45}/>
            <div className="pl-2">
              <p className="font-semibold text-sm">Wait for the seller to confirm the transfer and release the cryptocurrencies</p>
              <p className="text-gray-500 text-sm">This could take a period of 24 hours. If in more than 24 hours the seller does not confirm the transaction, you can report the seller</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircleIcon width={35} height={45}/>
            <div className="pl-2">
              <p className="font-semibold text-sm">Ready! A notification will be sent to your email confirming your new balance</p>
              <p className="text-gray-500 text-sm">We strongly recommend that you withdraw your cryptocurrency to a wallet that belongs to you as soon as possible</p>
            </div>
          </div>
        </div>
      </div>
      
      <PostCard sale={data}/>
    </div>
  );
}