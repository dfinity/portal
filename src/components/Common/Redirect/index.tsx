import React from "react";

const Redirect: React.FC<{ to: string }> = ({ to }) => {
  return <meta http-equiv="refresh" content={`0; url=${to}`} />;
};

export default Redirect;
