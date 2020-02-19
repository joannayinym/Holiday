import React, { ReactNode } from "react";
import { Switch, Route, Link } from "react-router-dom";

import { LayoutRoot } from "./Home";
import Header from "./Home/Header";
import Footer from "./Home/Footer";
import routes from "./routes";

export default () => {
  return (
    <LayoutRoot>
      <Header />
      <div style={{ display: "flex" }}>
        <div style={{ width: "200px" }}>
          <Link to="/signin">
            <p>Sign In</p>
          </Link>
          <Link to="/signup">
            <p>Sign Up</p>
          </Link>
        </div>
        <div>
          <Switch>
            {routes.map(router => {
              return (
                <Route
                  key={router.name}
                  exact={router.exact}
                  path={router.path}
                  component={router.component}
                />
              );
            })}
          </Switch>
        </div>
      </div>
      <Footer />
    </LayoutRoot>
    // <LayoutRoot>
    //   <Switch>
    //     <Route path="/loader" exact component={Skeleton} />
    //     <Route
    //       exact
    //       path="/login"
    //       component={renderComponentWithLayout(SignIn, LayoutWithHeader)}
    //     />
    //     <Route
    //       exact
    //       path="/signup"
    //       component={renderComponentWithLayout(SignUp, LayoutWithHeader)}
    //     />
    //     <PrivateRoute
    //       exact
    //       path="/sharing/:ticketGroupId/:ticketId"
    //       component={renderComponentWithLayout(TicketSharing, LayoutWithFooter)}
    //     />
    //     <PrivateRoute
    //       exact
    //       path="/sharing/:ticketGroupId"
    //       component={renderComponentWithLayout(TicketSharing, LayoutWithFooter)}
    //     />
    //     <Route
    //       exact
    //       path="/receiving/:ticketGroupId/:ticketId"
    //       component={renderComponentWithLayout(
    //         TicketReceiving,
    //         LayoutWithHeader
    //       )}
    //     />
    //     <Route
    //       exact
    //       path="/receiving/:ticketGroupId"
    //       component={renderComponentWithLayout(
    //         TicketReceiving,
    //         LayoutWithHeader
    //       )}
    //     />
    //     <Route
    //       path="/status"
    //       component={renderComponentWithLayout(StatusPage, LayoutWithHeader)}
    //     />
    //     <Route
    //       path="*"
    //       component={renderComponentWithLayout(NotFound, LayoutWithHeader)}
    //     />
    //   </Switch>
    //   <HowItWorksModal />
    //   <ConnectedFullscreenLoader />
    // </LayoutRoot>
  );
};
