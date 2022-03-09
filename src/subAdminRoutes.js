/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import "../node_modules/bootstrap/dist/css/bootstrap.css";
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
// import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
// core components/views for Admin layout
import Deals from "SubAdminViews/Deals/Deals";

import Icons from "views/Icons/Icons.js";
// import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";

// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import SubAdmin from "views/SubAdmin/SubAdmin";
import Users from "SubAdminViews/Users/Users"

import Restaurants from 'SubAdminViews/Restaurants/Restaurants'

const subAdminRoutes = [

  {
    path: "/restaurants",
    name: "Restaurants",
    rtlName: "لوحة القيادة",
    icon: ChromeReaderModeIcon,
    component: Restaurants,
    layout: "/subadmin",
  },

  {
    path: "/deals",
    name: "Deals",
    rtlName: "لوحة القيادة",
    icon: ChromeReaderModeIcon,
    component: Deals,
    layout: "/subadmin",
  },

  {
    path: "/users",
    name: "Users",
    rtlName: "لوحة القيادة",
    icon: ChromeReaderModeIcon,
    component: Users,
    layout: "/subadmin",
  },
  
  // {
  //   path: "/faq",
  //   name: "Faq",
  //   rtlName: "لوحة القيادة",
  //   icon: ChromeReaderModeIcon,
  //   component: Faq,
  //   layout: "/admin",
  // },
  // {
  //   path: "/testimonials",
  //   name: "Testimonials",
  //   rtlName: "لوحة القيادة",
  //   icon: ChromeReaderModeIcon,
  //   component: Testimonials,
  //   layout: "/admin",
  // },
  // {
  //   path: "/team",
  //   name: "Team",
  //   rtlName: "لوحة القيادة",
  //   icon: ChromeReaderModeIcon,
  //   component: Team,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/admin",
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   rtlName: "قائمة الجدول",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/admin",
  // },
];

export default subAdminRoutes;
