import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getNodeText = (node: React.ReactNode): string => {
  if (node == null) return "";

  switch (typeof node) {
    case "string":
    case "number":
      return node.toString();

    case "boolean":
      return "";

    case "object": {
      if (node instanceof Array) return node.map(getNodeText).join("");

      if ("props" in node) return getNodeText(node.props.children);

      console.warn("Unresolved `node` of type:", typeof node, node);
      return "";
    } // eslint-ignore-line no-fallthrough

    default:
      console.warn("Unresolved `node` of type:", typeof node, node);
      return "";
  }
};
