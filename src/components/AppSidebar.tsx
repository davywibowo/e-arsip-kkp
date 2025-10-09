"use client";
import {
  IconChartBar,
  IconDashboard,
  IconInnerShadowTop,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { DataUser } from "@/types";

type AppSidebarProps = {
  dataUser: DataUser | null;
} & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ dataUser, ...props }: AppSidebarProps) {
  const data = {
    user: dataUser,
    navMain: [
      {
        title: "Dashboard",
        url: "#",
        icon: IconDashboard,
      },
      {
        title: "Data Pegawai",
        url: "#",
        icon: IconUsers,
      },
      {
        title: "Manajemen Pengguna",
        url: "#",
        icon: IconChartBar,
      },
      {
        title: "Settings",
        url: "#",
        icon: IconSettings,
      },
    ],
  };

  console.log(data.user);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-9" />
                <span className="text-lg font-semibold ">Arsip Pegawai</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      {data.user ? (
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      ) : null}
    </Sidebar>
  );
}
