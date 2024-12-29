import Image from "next/image";
import openFolder from "@/assets/icons/openfolder.svg";
import menu2 from "@/assets/icons/menu2.svg";

export const MenuHeader = () => {
  return (
    <>
      <div className="text-sm text-gray-500 mb-4 flex items-center">
        <span className="mr-2">
          <Image
            className="h-5 invert"
            src={openFolder}
            alt="Open Folder"
            width={20}
            height={20}
          />
        </span>
        / Menus
      </div>
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <span className="text-blue-600 mr-2">
          <Image
            className="h-10"
            src={menu2}
            alt="Menu"
            width={40}
            height={40}
          />
        </span>
        Menus
      </h1>
    </>
  );
};
