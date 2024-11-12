import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowDownUp } from "lucide-react";
import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { Row } from "@/components/ui/rowcol";

type SortableHeaderProps<TData> = {
  column: Column<TData, any>;
};

export function SortableHeader<TData>({
  children,
  column,
}: PropsWithChildren<SortableHeaderProps<TData>>) {
  const getArrow = (sort: false | "asc" | "desc") => {
    const sharedStyles = "h-4 w-4 transition-opacity duration-200";

    switch (sort) {
      case false:
        return (
          <ArrowDownUp
            className={cn(sharedStyles, "opacity-0 group-hover:opacity-100")}
          />
        );
      case "asc":
        return <ArrowDown className={sharedStyles} />;
      default:
        return <ArrowUp className={sharedStyles} />;
    }
  };

  return (
    <Row
      className="items-center gap-2 group cursor-pointer transition-colors duration-200 hover:text-primary-foreground select-none"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {children}
      {column.getCanSort() && getArrow(column.getIsSorted())}
    </Row>
  );
}
