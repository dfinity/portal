/**
 * @file breakpoint
 */

import Constants from "./constants";

export enum Breakpoint {
  XXS,
  XS,
  SM,
  MD,
  LG1,
  LG2,
  XL,
}

/**
 * Return the current breakpoint.
 * @returns {number} The current breakpoint.
 * @private
 */
export function getBreakpoint(): Breakpoint {
  if (
    window.matchMedia("(max-width: " + Constants.breakpointMaxXXS + "px)")
      .matches
  )
    return Breakpoint.XXS;
  else if (
    window.matchMedia("(max-width: " + Constants.breakpointMaxXS + "px)")
      .matches
  )
    return Breakpoint.XS;
  else if (
    window.matchMedia("(max-width: " + Constants.breakpointMaxSM + "px)")
      .matches
  )
    return Breakpoint.SM;
  else if (
    window.matchMedia("(max-width: " + Constants.breakpointMaxMD + "px)")
      .matches
  )
    return Breakpoint.MD;
  else if (
    window.matchMedia("(max-width: " + Constants.breakpointMaxLG1 + "px)")
      .matches
  )
    return Breakpoint.LG1;
  else if (
    window.matchMedia("(max-width: " + Constants.breakpointMaxLG2 + "px)")
      .matches
  )
    return Breakpoint.LG2;
  else return Breakpoint.XL;
}
