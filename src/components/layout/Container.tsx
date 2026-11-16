import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav";
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

export function Container({ children, className = "", as: Element = "div", ...attributes }: ContainerProps) {
  return <Element className={"container " + className} {...attributes}>{children}</Element>;
}
