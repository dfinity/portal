import { ReactNode, useRef, useState } from "react";
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
  showArrow?: boolean;
}

export function Tooltip({
  text = "",
  children,
  placement = "top",
  showArrow = true,
}: TooltipProps) {
  const arrowRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      showArrow &&
        arrow({
          element: arrowRef,
        }),
      offset(10),
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

  const tooltipColor = "rgba(24, 24, 24, 0.9)";

  return (
    <>
      <span
        ref={refs.setReference}
        {...getReferenceProps()}
        style={{
          textDecoration: "underline",
          cursor: "default",
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
            {showArrow && (
              <FloatingArrow
                ref={arrowRef}
                context={context}
                fill={tooltipColor}
              />
            )}
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
