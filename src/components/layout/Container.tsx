import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav";
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-busy"?: boolean | "true" | "false";
};

export function Container({ children, className = "", as: Element = "div", ...attributes }: ContainerProps) {
  return <Element className={"container " + className} {...attributes}>{children}</Element>;
}
