 import { useEffect, useState } from "react";
import Image from "next/image";
import { Icons } from "@/assets/Icons";
 
const TreeMenu = ({
  menu,
  depth = 0,
  expandIt = true,
  setSelectedMenu,
  selectedMenu,
}) => {
  const [isExpanded, setIsExpanded] = useState(expandIt);

  useEffect(() => {
    setIsExpanded(expandIt);
  }, [expandIt]);

  const hasChildren = menu.children && menu.children.length > 0;

  return (
    <div className={`${depth > 0 ? "ml-4" : "ml-0"}`}>
      <div className="flex items-center">
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mr-1 focus:outline-none"
          >
            <Image
              src={Icons.arrow}
              width={16}
              height={16}
              className={`${isExpanded ? "" : "rotate-180"}`}
              alt="Expand/Collapse"
            />
          </button>
        )}
        {!hasChildren && <div className="w-4 h-4 mr-1" />}
        <span
          className={`cursor-pointer group flex items-center h-7 gap-1 ${
            selectedMenu?.id === menu?.id ? "font-semibold" : ""
          }`}
        >
          <button
            className="text-[#101828]"
            onClick={() => setSelectedMenu(menu, "edit")}
          >
            {menu.name}
          </button>
          <div className="items-center gap-2 hidden group-hover:flex">
            <button onClick={() => setSelectedMenu(menu, "add")}>
              <Image
                className="h-7 w-auto"
                src={Icons.plus}
                width={28}
                height={28}
                alt="Add"
              />
            </button>
            <button
              onClick={() => setSelectedMenu({ ...menu, depth }, "delete")}
            >
              <Image
                className="h-7 w-auto"
                src={Icons.bin}
                width={28}
                height={28}
                alt="Delete"
              />
            </button>
          </div>
        </span>
      </div>
      {isExpanded && hasChildren && (
        <div className="ml-4 mt-1 border-l-[1.5px]   border-[#98A2B3]">
          {menu.children?.length > 0 &&
            menu.children.map((childMenu) => (
              <div key={childMenu.id} className="relative">
                <div className="absolute top-3 w-3 border-t-[1.5px] border-[#98A2B3]" />
                <TreeMenu
                  menu={childMenu}
                  depth={depth + 1}
                  setSelectedMenu={setSelectedMenu}
                  selectedMenu={selectedMenu}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TreeMenu;
