import React, { ReactNode, useRef, useState } from "react";
import {
  useFloating,
  useHover,
  useInteractions,
  FloatingArrow,
  arrow,
  safePolygon,
  offset,
  flip,
  shift,
  autoUpdate,
  useFocus,
  useDismiss,
  useRole,
  FloatingPortal,
  Placement,
} from "@floating-ui/react";

export interface TooltipProps {
  text: string;
  children: ReactNode;
  placement?: Placement;
}

export function Tooltip({
  text = "",
  children,
  placement = "top",
}: TooltipProps) {
  const arrowRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      arrow({
        element: arrowRef,
      }),
      offset(5),
      flip({
        fallbackAxisSideDirection: "start",
      }),
      shift(),
    ],
  });

  const hover = useHover(context, {
    handleClose: safePolygon(),
    move: false,
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const tooltipColor = "rgba(24, 24, 24, 0.6)";

  return (
    <>
      <span
        ref={refs.setReference}
        {...getReferenceProps()}
        style={{
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        {children}
      </span>
      <FloatingPortal>
        {isOpen && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <FloatingArrow
              ref={arrowRef}
              context={context}
              fill={tooltipColor}
            />
            <div
              style={{
                background: tooltipColor,
                padding: "12px",
                borderRadius: "1rem",
                color: "white",
              }}
            >
              {text}
            </div>
          </div>
        )}
      </FloatingPortal>
    </>
  );
}
