import { Typography } from "@mui/material";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { FaHamburger } from "react-icons/fa";
import { GiCrossedSabres } from "react-icons/gi";
import { useSelector } from "react-redux";
import noAvatar from "../../../public/noavatar.png";
import { useLogoutQuery } from "@/redux/features/auth/authApi";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import "./admin.css";
import MenuItems from "./Icon";
interface ItemProps {
  menu: {
    title: string;
    Icon: any;
    to: string;
  }[];
  label?: string;
  collapsed?: boolean;
  selected: string;
  setSelected: (selected: string) => void;
  handleLogout: any;
}

const Item: FC<ItemProps> = (props) => {
  const { selected, menu, collapsed, label, setSelected, handleLogout } = props;
  return (
    <div className="MenuItem">
      {!collapsed && <Typography className="py-2 px-5">{label}</Typography>}
      <div className="subMenu my-2">
        {menu?.map(({ title, Icon, to }) => (
          <Link
            key={title}
            href={to}
            onClick={() => {
              setSelected(title);
              if (title === "Logout") {
                handleLogout();
              }
            }}
            className={`px-5 my-2 text-[12px] mt-4 flex gap-3 hover:text-[--t-blue] hover:scale-y-105 ${
              selected === title && "text-[--t-blue]"
            }`}
          >
            <Icon />
            {!collapsed && <span className="text-[16px]">{title}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
};

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}
const AdminSidebar: FC<SidebarProps> = (props) => {
  const { collapsed, setCollapsed } = props;
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);
  const [selected, setSelected] = useState("Dashboard");
  const [logout, setLogout] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const { data } = useSession();

  const {} = useLogoutQuery(undefined, {
    skip: !logout,
  });

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return;
  }

  const handleLogout = async () => {
    setLogout(true);
    if (data !== null) {
      await signOut();
    }
    router.push("/");
  };
  return (
    <div
      className={`sidebar z-[999] bg-[#f7f7f7] dark:bg-black fixed left-0 top-0 h-full transition-[width] duration-900 ${
        collapsed ? "w-[60px]" : "w-[280px]"
      }`}
    >
      {!collapsed ? (
        <>
          {" "}
          <div className="sidebarHeader mb-3">
            <div className="flex justify-between py-3 px-5 items-center gap-8">
              <Typography component="h1" className="">
                Compiler Academy
              </Typography>
              <GiCrossedSabres
                size={20}
                className="cursor-pointer hover:scale-x-110"
                onClick={() => setCollapsed(true)}
              />
            </div>
            <div className="flex py-2 gap-5 jus items-center px-5">
              <div className="flex justify-center flex-col items-center gap-1">
                <Image
                  src={user?.avatar?.url || noAvatar}
                  width={150}
                  height={150}
                  alt="profile-img"
                  className="w-[60px] h-[60px] rounded-full border-[3px] border-[#37a39a]"
                />
                {/* <Typography component="h1" className="">
              -Admin{" "}
            </Typography> */}
              </div>
              <Typography component="h1" className="">
                Welcome, <br /> {user?.name}
              </Typography>
            </div>
          </div>
        </>
      ) : (
        <FaHamburger
          onClick={() => setCollapsed(false)}
          className="cursor-pointer hover:scale-x-110 hover:text-[--t-blue] mx-5 my-5"
          size={20}
        />
      )}
      <hr />
      <div className="sidebarMenu">
        {MenuItems.map((item: any , index) => {
          return <Item
            key={index}
            collapsed={collapsed}
            label={item.label}
            menu={item.subMenu}
            selected={selected}
            setSelected={setSelected}
            handleLogout={handleLogout}
          />;
        })}
      </div>
    </div>
  );
};

export default AdminSidebar;
