"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useLogout } from "@/hooks/use-logout"
import { EllipsisVerticalIcon, CircleUserRoundIcon, LogOutIcon } from "lucide-react"
import { CldImage } from "next-cloudinary"

type Props = {
  user: {
    name: string
    email: string
    image?: string | null  // optional — Better Auth uses "image" not "avatar"
  }
}

// Get initials from name — "Vishal Dewani" → "VD"
function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function UserAvatar({
  image,
  name,
  className,
}: {
  image?: string | null
  name: string
  className?: string
}) {
  const initials = getInitials(name)

  return (
    <Avatar className={className}>
      {image ? (
          <CldImage
          src={image}
          width={40}
          height={40}
          alt={name}
          className="h-full w-full object-cover rounded-full"
        />
      ) : (
           <AvatarFallback className="rounded-lg bg-muted text-muted-foreground text-xs font-medium">
        {initials}
        </AvatarFallback>
      )}
      {/* AvatarFallback shows when image is null/undefined or fails to load */}
   
    </Avatar>
  )
}

export function NavUser({ user }: Props) {
  const { isMobile } = useSidebar()
  const handleLogout = useLogout()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserAvatar
                image={user.image}
                name={user.name}
                className="h-8 w-8 rounded-lg grayscale"
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
              <EllipsisVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserAvatar
                  image={user.image}
                  name={user.name}
                  className="h-8 w-8 rounded-lg"
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <CircleUserRoundIcon />
                Profile
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem variant="destructive" onClick={handleLogout}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}