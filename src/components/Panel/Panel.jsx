import React from "react";
import "./style.css";

export const Panel = ({className, children, id}) => {
  return (
    <div className={className} key = {`panel_${id}`} id={id}>
      {children}
    </div>
  );
};
