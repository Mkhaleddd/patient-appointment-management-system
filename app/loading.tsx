
import {DotLoader} from "react-spinners"

export default function Loading() {
  return (
    <div className="flex-center size-full h-screen gap-3 text-white">
        <DotLoader color="#24AE7C"  size={60} speedMultiplier={1}/>
    </div>
  );
}