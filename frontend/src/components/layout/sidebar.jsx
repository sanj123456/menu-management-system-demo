'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

 
import  logo from  "../../assets/images/logo.svg";

 
import { Icons } from "@/assets/Icons";

export default function Sidebar() {
  const [openSections, setOpenSections] = useState ([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      sectionName: "Systems",
      icon: Icons.systemCode,
      items: [
        {
          href: "/system-code",
          icon: Icons.systemCode,
          filledIcon: Icons.systemCodeFilled,
          name: "SystemCode",
        },
        {
          href: "/properties",
          icon: Icons.prop,
          filledIcon: Icons.propFilled,
          name: "Properties",
        },
        {
          href: "/menus",
          icon: Icons.menu,
          filledIcon: Icons.menuFilled,
          name: "Menus",
        },
        {
          href: "/api-list",
          icon: Icons.appList,
          filledIcon: Icons.appListFilled,
          name: "API List",
        },
      ],
    },
    {
      sectionName: "Users & Group",
      icon: Icons.users,
      items: [
        { href: "/users",   name: "Users" },
        { href: "/groups",   name: "Groups" },
      ],
    },
    {
      sectionName: "Competition",
      icon: Icons.competition,
      items: [
        { href: "/competitors",  name: "Competitors" },
        { href: "/analysis",   name: "Analysis" },
      ],
    },
  ];

  useEffect(() => {
    const activeSection = navItems.find((section) =>
      section.items.some((item) => item.href === pathname)
    );
    if (activeSection) {
      setOpenSections([activeSection.sectionName]);
    } else {
      setOpenSections([]);
    }
  }, [pathname]);

  const toggleSection = (sectionName) => {
    setOpenSections((prev) =>
      prev.includes(sectionName)
        ? prev.filter((name) => name !== sectionName)
        : [sectionName]
    );
    if (isCollapsed) {
      setIsCollapsed(false);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) {
      const activeSection = navItems.find((section) =>
        section.items.some((item) => item.href === pathname)
      );
      if (activeSection) {
        setOpenSections([activeSection.sectionName]);
      } else {
        setOpenSections([]);
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavItemClick = (sectionName ) => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setOpenSections([sectionName]);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile burger icon */}
      <div className="md:hidden w-full flex flex-col  justify-start p-1  z-50 bg-white">
        <Image
          src={Icons.openBurgur}
          alt="Menu"
          width={32}
          height={32}
          className="cursor-pointer w-8 h-8 z-50 bg-white"
          onClick={toggleMobileMenu}
        />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform scroll-smooth no-scrollbar overflow-y-auto m-2
                   md:relative md:translate-x-0 transition-all duration-300 ease-in-out z-[900]
                   md:sticky md:h-[98vh] overflow-auto
                   ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-10"}
                   ${isCollapsed ? "md:w-16" : "md:w-64"}
                   ${isMobileMenuOpen ? "w-64" : "w-0"}
                   bg-primary rounded-2xl p-4`}
      >
        <div className="flex items-center justify-between mb-6">
          {(!isCollapsed || isMobileMenuOpen) && (
            <Image
              className="h-7"
              src={logo}
              alt="Logo"
              width={28}
              height={28}
            />
          )}
          <Image
            src={isCollapsed ? Icons.openBurgur : Icons.closeBurgur}
            alt="Menu"
            width={32}
            height={32}
            className={`cursor-pointer ${isCollapsed && "invert"}`}
            onClick={() => {
              if (window.innerWidth >= 768) {
                toggleCollapse();
              } else {
                toggleMobileMenu();
              }
            }}
          />
        </div>
        <nav>
          {navItems.map((section, index) => {
            const isSectionOpen = openSections.includes(section.sectionName);
            return (
              <div
                key={index}
                className={`mb-4 p-2 ${
                  isSectionOpen ? "bg-[#1d2939] rounded-md" : ""
                }`}
              >
                <h2
                  className={`text-gray-400 text-sm mb-2 flex items-center font-semibold gap-3 cursor-pointer ${
                    isSectionOpen ? "text-white" : "text-[#667085]"
                  }`}
                  onClick={() => toggleSection(section.sectionName)}
                >
                  <Image
                    src={isSectionOpen ? Icons.openFolder : Icons.closeFolder}
                    alt=""
                    width={24}
                    height={24}
                  />
                  {(!isCollapsed || isMobileMenuOpen) && section.sectionName}
                </h2>
                {isSectionOpen && (
                  <ul
                    className={isCollapsed && !isMobileMenuOpen ? "hidden" : ""}
                  >
                    {section.items.map((item, itemIndex) => {
                      const isActive = pathname === item.href;
                      return (
                        <li key={itemIndex}>
                          <Link
                            href={item.href}
                            className={`flex items-center font-bold p-2 rounded-xl ${
                              isActive
                                ? "bg-[#5ADB5A] text-[#101828]"
                                : "text-[#667085]"
                            }`}
                            onClick={() =>
                              handleNavItemClick(section.sectionName)
                            }
                          >
                            {(item.filledIcon || item.icon) && (
                              <span className="mr-3">
                                <Image
                                  src={isActive ? item.filledIcon : item.icon}
                                  alt=""
                                  width={24}
                                  height={24}
                                />
                              </span>
                            )}
                            {(!isCollapsed || isMobileMenuOpen) && item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
}