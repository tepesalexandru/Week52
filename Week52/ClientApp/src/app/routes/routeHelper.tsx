import React from "react";
import { Route, Switch } from "react-router";

export function RenderComponentRoutes(routes: any) {
  return (
    <Switch>
      {routes.map((route: any, i: any) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Switch>
  );
}

export function RouteWithSubRoutes(route: any) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
