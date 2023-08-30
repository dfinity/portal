/**
 * @file useBreakpoint
 */

import Constants from "./constants";
import { Breakpoint } from "./breakpoint";
import useMediaQuery from "../../../utils/use-media-query";

/**
 * Return the breakpoint when the window is resized. When this function is called on the server and
 * the first time it is called on the client, it will return undefined.
 * @returns {Breakpoint|undefined} The current breakpoint, or undefined if not set yet.
 */
const useBreakpoint = (): Breakpoint | undefined => {
  const isXXS: boolean = useMediaQuery(
    "(max-width: " + Constants.breakpointMaxXXS + "px)"
  );
  const isXS: boolean = useMediaQuery(
    "(max-width: " + Constants.breakpointMaxXS + "px)"
  );
  const isSM: boolean = useMediaQuery(
    "(max-width: " + Constants.breakpointMaxSM + "px)"
  );
  const isMD: boolean = useMediaQuery(
    "(max-width: " + Constants.breakpointMaxMD + "px)"
  );
  const isLG1: boolean = useMediaQuery(
    "(max-width: " + Constants.breakpointMaxLG1 + "px)"
  );
  const isLG2: boolean = useMediaQuery(
    "(max-width: " + Constants.breakpointMaxLG2 + "px)"
  );
  const isXL: boolean = useMediaQuery(
    "(max-width: " + Constants.breakpointMaxXL + "px)"
  );

  let breakpoint: Breakpoint | undefined;
  if (isXXS) breakpoint = Breakpoint.XXS;
  else if (isXS) breakpoint = Breakpoint.XS;
  else if (isSM) breakpoint = Breakpoint.SM;
  else if (isMD) breakpoint = Breakpoint.MD;
  else if (isLG1) breakpoint = Breakpoint.LG1;
  else if (isLG2) breakpoint = Breakpoint.LG2;
  else if (isXL) breakpoint = Breakpoint.XL;
  else breakpoint = undefined;
  return breakpoint;
};

export default useBreakpoint;
