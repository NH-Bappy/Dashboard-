"use client"

import * as React from "react"
import {
  AudioWaveform,
  Barcode,
  BetweenHorizontalEnd,
  BookOpen,
  Bot,
  Command,
  Folders,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Projector,
  ProjectorIcon,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "end",
    email: "hnaimul302@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Voltora",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Category",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "Create-category",
          url: "create-category",
        },
        {
          title: "Category List",
          url: "category-list",
        },
      ],
    },
    {
      title: "Subcategory",
      url: "#",
      icon: BetweenHorizontalEnd,
      isActive: false,
      items: [
        {
          title: "Create-subcategory",
          url: "create-subcategory",
        },
        {
          title: "Subcategory List",
          url: "subcategory-list",
        },
      ],
    },
    {
      title: "Brand",
      url: "#",
      icon: Bot,
      isActive: false,
      items: [
        {
          title: "create-Brand",
          url: "create-Brand",
        },
        {
          title: "Brand List",
          url: "find-all-brand",
        },
      ],
    },

    {
      title: "product",
      url: "#",
      icon: ProjectorIcon,
      isActive: false,
      items: [
        {
          title: "create-product",
          url: "create-product",
        },
        {
          title: "Product-List",
          url: "productList",
        },
      ],
    },

    {
      title: "variant-product",
      url: "create-variant-product",
      icon: Folders,
      isActive: false,
      items: [
        {
          title: "create-variant-product",
          url: "create-variant-product",
        },
        {
          title: "variant-product-List",
          url: "multiple-Variant-List",
        },
      ],
    },
    {
      title: "variant",
      url: "create-variant",
      icon: Barcode,
      isActive: true,
      items: [
        {
          title: "create-variant",
          url: "create-variant",
        },
        {
          title: "Variant-List",
          url: "variant-list",
        },
      ],
    },

    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
