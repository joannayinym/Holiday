import Home from "./Home/Home";
import Signin from "./Signin/index";
import Signup from "./Signup/index";
import TourLists from "./TourLists/index";

const routes = [
  {
    path: "/",
    exact: true,
    name: "Home",
    component: Home
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/tourlists",
    name: "TourLists",
    component: TourLists
  }
];

export default routes;
