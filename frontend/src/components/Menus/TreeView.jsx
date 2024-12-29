import React from "react";
import Image from "next/image";
import TreeMenu from "../ui/TreeMenu";
import { Icons } from "@/assets/Icons";
 

export const TreeView = ({
  treeData,
  isLoading,
  expandIt,
  selectedMenu,
  onMenuSelection,
  setExpandIt,
}) => {
  return (
    <div className="w-full">
      <div className="flex mb-3">
        <button
          onClick={() => setExpandIt(true)}
          className={`${
            expandIt
              ? "bg-[#1d2939] text-white "
              : "bg-gray-200 text-[#475467] border border-[#d0d5dd]"
          } px-4 py-2 rounded-full mr-4`}
        >
          Expand All
        </button>
        <button
          onClick={() => setExpandIt(false)}
          className={`${
            !expandIt
              ? "bg-[#1d2939] text-white"
              : "bg-gray-200 text-[#475467] border border-[#d0d5dd]"
          } px-4 py-2 rounded-full`}
        >
          Collapse All
        </button>
      </div>

      {!isLoading ? (
        <div className="mb-6 rounded-md p-4 w-full">
          {treeData?.length > 0 &&
            treeData.map((menu) => (
              <TreeMenu
                key={menu.id}
                menu={menu}
                parentMenu={menu}
                setSelectedMenu={onMenuSelection}
                selectedMenu={selectedMenu}
                expandIt={expandIt}
              />
            ))}
        </div>
      ) : (
        <div className="flex py-7 justify-center">
          <Image
            className="h-7"
            src={Icons.loader}
            alt="Loading"
            width={28}
            height={28}
          />
        </div>
      )}
    </div>
  );
};
