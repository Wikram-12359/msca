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
import { LayoutDashboardIcon, ListIcon, TestTube2, UsersIcon, } from "lucide-react"
import Image from "next/image"
import { authClient } from "@/lib/auth-client"
import { NavMain } from "./nav-main"

const studentData = {
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


const adminData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: (
        <LayoutDashboardIcon
        />
      ),
    },
    {
      title: "Add Students",
      url: "/admin/dashboard/enroll-students",
      icon: (
        <ListIcon
        />
      ),
    },
    {
      title: "Tests",
      url: "/admin/dashboard/tests",
      icon: (
        <TestTube2
        />
      ),
    },
    
  ],
  
  
}

const teacherData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/teacher",
      icon: (
        <LayoutDashboardIcon
        />
      ),
    },
    {
      title: "Profile",
      url: "/teacher/profile",
      icon: (
        <UsersIcon
        />
      ),
    }
  ],
  
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();
  const user = session?.user
  let links;

  if(user?.role == "teacher"){
    links = teacherData.navMain
  }else if(user?.role == "admin"){
    links = adminData.navMain
  }else{
    links = studentData.navMain
  }

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
        <NavMain items={links} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{
          name: session?.user?.name ?? "",
          email: session?.user?.email ?? "",
          image: session?.user?.image,  // not avatar
        }} />
      </SidebarFooter>
    </Sidebar>
  )
}
