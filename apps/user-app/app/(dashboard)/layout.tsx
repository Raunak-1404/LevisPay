import { SidebarItems } from "@repo/ui/SidebarItems";
import { FaHome } from "react-icons/fa";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import { FaStopwatch } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex ">
      <div className="w-[17%] border-r border-slate-300 min-h-[93.4vh] pt-16">
        <div className="flex flex-col gap-3">
          <SidebarItems href={"/dashboard"} icon={<FaHome />} title="Home" />
          <SidebarItems
            href={"/P2P"}
            icon={<FaMagnifyingGlass />}
            title="P2P Transfer"
          />
          <SidebarItems
            href={"/transfer"}
            icon={<HiOutlineArrowsRightLeft />}
            title="Transfer"
          />
          <SidebarItems
            href={"/onRamptransactions"}
            icon={<FaStopwatch />}
            title="OnRampTransactions"
          />
          <SidebarItems
            href={"/p2pTransactions"}
            icon={<FaStopwatch />}
            title="P2PTransactions"
          />
        </div>
      </div>
      {children}
    </div>
  );
}
