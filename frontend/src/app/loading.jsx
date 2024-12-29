import { Icons } from "@/assets/Icons";
import Image from "next/image";

export default function Loading() {
  
  return (
    <div className="flex mt-10 w-full  justify-center items-center">
      <Image
        className="h-7"
        src={Icons.loader}
        alt="Loading"
        width={28}
        height={28}
      />
    </div>
  );
}
