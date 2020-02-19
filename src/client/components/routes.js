import Home from "./Home/Home";
import Signin from "./Signin/index";
import Signup from "./Signup/index";

const routes = [
  {
    path: "/",
    exact: undefined,
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
  }
];

export default routes;
