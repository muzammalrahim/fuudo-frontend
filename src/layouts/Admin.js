import React from "react";
import { Switch, Route} from "react-router-dom";
// import {  Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

// import routes from "routes.js";

import routes from "routes"

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";


import ViewDeals from "../views/Deals/ViewDeals";
import EditDeal from "../views/Deals/EditDeal";
import AddDeals from "../views/Deals/AddDeals";

import ViewSubAdmin from "../views/SubAdmin/ViewSubAdmin";
import EditSubAdmin from "../views/SubAdmin/EditSubAdmin";
import AddSubadmin from "../views/SubAdmin/AddSubadmin";

import ViewUser from "../views/Users/ViewUser";
import EditUser from "../views/Users/EditUser";
import AddUser from "../views/Users/AddUser";

import ViewRestaurant from "../views/Restaurants/ViewRestaurant";
import EditRestaurant from "../views/Restaurants/EditRestaurant";
import AddRestaurant from "../views/Restaurants/AddRestaurant";
import Items from "views/Restaurants/Items";

let ps;

const extraRoute = [

  {
    path: "/add-deal",
    name: "Add Deal",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: AddDeals,
    layout: "/admin",
  },
  {
    path: "/edit-deal/:id",
    name: "Add Deal",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: EditDeal,
    layout: "/admin",
  },
  {
    path: "/view-deal/:id",
    name: "Add Project",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: ViewDeals,
    layout: "/admin",
  },
  {
    path: "/add-user",
    name: "Add User",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: AddUser,
    layout: "/admin",
  },
  {
    path: "/view-user/:id",
    name: "view User",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: ViewUser,
    layout: "/admin",
  },
  {
    path: "/edit-user/:id",
    name: "Edit User",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: EditUser,
    layout: "/admin",
  },

  {
    path: "/add-restaurant",
    name: "Add Restaurant",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: AddRestaurant,
    layout: "/admin",
  },

  {
    path: "/items",
    name: "Items",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Items,
    layout: "/admin",
  },

  {
    path: "/view-restaurant/:id",
    name: "view Restaurant",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: ViewRestaurant,
    layout: "/admin",
  },
  {
    path: "/edit-restaurant/:id",
    name: "Edit Restaurant",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: EditRestaurant,
    layout: "/admin",
  },

  {
    path: "/add-subAdmin",
    name: "Add SubAdmin",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: AddSubadmin,
    layout: "/admin",
  },
  {
    path: "/view-subAdmin/:id",
    name: "view SubAdmin",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: ViewSubAdmin,
    layout: "/admin",
  },
  {
    path: "/edit-subAdmin/:id",
    name: "Edit SubAdmin",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: EditSubAdmin,
    layout: "/admin",
  },
];

const totalRoute = routes.concat(extraRoute)
const switchRoutes = (
  <Switch>
    {totalRoute.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    {/* <Redirect from="/admin" to="/admin/dashboard" /> */}
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleImageClick = (image) => {
    setImage(image);
  };
  const handleColorClick = (color) => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"Foodu"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer /> : null}
        {/* <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        /> */}
      </div>
    </div>
  );
}
