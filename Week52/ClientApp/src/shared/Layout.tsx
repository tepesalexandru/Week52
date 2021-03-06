import * as React from "react";

export default (props: { children?: React.ReactNode }) => (
  <React.Fragment>{props.children}</React.Fragment>
);
