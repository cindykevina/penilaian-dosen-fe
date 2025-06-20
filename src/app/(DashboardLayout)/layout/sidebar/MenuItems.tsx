import {
  IconAperture,
  IconLayoutDashboard,
  IconSchool,
  IconLogin,
  IconUsers,
  IconMoodHappy,
  IconCalendarWeek,
  IconFileCheck,
  IconNotebook,
  IconList,
  IconUser,
  IconFileAnalytics,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  // {
  //   navlabel: true,
  //   subheader: "HOME",
  // },

  // {
  //   id: uniqueId(),
  //   title: "Dashboard",
  //   icon: IconLayoutDashboard,
  //   href: "/",
  // },
  {
    navlabel: true,
    subheader: "PENILAIAN",
  },
  {
    id: uniqueId(),
    title: "Penilaian",
    icon: IconFileCheck,
    href: "/penilaian",
  },
  {
    id: uniqueId(),
    title: "Report",
    icon: IconFileAnalytics,
    href: "/report",
  },
  {
    navlabel: true,
    subheader: "MASTER DATA",
  },
  {
    id: uniqueId(),
    title: "Kriteria",
    icon: IconNotebook,
    href: "/kriteria",
  },
  {
    id: uniqueId(),
    title: "Sub Kriteria",
    icon: IconList,
    href: "/sub-kriteria",
  },
  {
    id: uniqueId(),
    title: "Dosen",
    icon: IconSchool,
    href: "/dosen",
  },
  {
    id: uniqueId(),
    title: "Periode",
    icon: IconCalendarWeek,
    href: "/periode",
  },
  {
    id: uniqueId(),
    title: "Homebase",
    icon: IconCalendarWeek,
    href: "/homebase",
  },
  {
    navlabel: true,
    subheader: "USER",
  },
  {
    id: uniqueId(),
    title: "User",
    icon: IconUsers,
    href: "/user",
  },
];

export default Menuitems;


