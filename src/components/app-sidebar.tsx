"use client"

import * as React from "react"

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, ListIcon, UsersIcon, } from "lucide-react"
import Image from "next/image"
import { authClient } from "@/lib/auth-client"
import { NavMain } from "./nav-main"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: (
        <LayoutDashboardIcon
        />
      ),
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: (
        <UsersIcon
        />
      ),
    },
    {
      title: "Results",
      url: "/dashboard/results",
      icon: (
        <ListIcon
        />
      ),
    },
    
  ],
  
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();
  const user = session?.user
  console.log(user);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <Image src={"/images/logo.jpeg"} width={30} height={30} alt="logo" />
                <span className="text-base font-semibold">MindSpark Coaching Academy</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{name: user?.name || "", email: user?.email || "", avatar: ""  }} />
      </SidebarFooter>
    </Sidebar>
  )
}
