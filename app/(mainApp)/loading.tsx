import { RingLoader } from "react-spinners";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex items-center justify-center min-h-screen">
      <RingLoader color="#36d7b7" loading size={100} speedMultiplier={1} />
    </div>
  )
}