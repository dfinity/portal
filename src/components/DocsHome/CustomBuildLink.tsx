import React from "react";
import { useHistory } from "@docusaurus/router";

function CustomBuildLink({ to, children }) {
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();

    if (window.innerWidth <= 996) {
      // Docusaurus mobile breakpoint
      // Trigger sidebar opening
      document
        .querySelector(".navbar__toggle")
        ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

      // Use a small delay to ensure the sidebar opens before navigation
      setTimeout(() => {
        history.push(to);
      }, 50);
    } else {
      history.push(to);
    }
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export default CustomBuildLink;
