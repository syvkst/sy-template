import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  Column,
  RowSelectionState,
  ColumnFiltersState,
  OnChangeFn,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ReactNode, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Col } from "@/components/ui/rowcol";
import { Heading } from "@/components/ui/headings";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filter?: "global";
  additionalFilters?: ReactNode[];
  getRowId: (row: TData) => string;
  onRowsDeleted?: (rowIds: string[]) => void;
  selections?: RowSelectionState;
  onSelectionsChanged?: OnChangeFn<RowSelectionState>;
  tableTitle?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filter,
  additionalFilters,
  getRowId,
  onRowsDeleted,
  selections,
  onSelectionsChanged,
  tableTitle,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelectionInternal, setRowSelectionInternal] =
    useState<RowSelectionState>({});

  const rowSelection = selections ?? rowSelectionInternal;
  const setRowSelection = onSelectionsChanged ?? setRowSelectionInternal;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getRowId: getRowId,
    state: {
      sorting,
      globalFilter,
      rowSelection,
      columnFilters,
    },
  });

  const { t } = useTranslation();

  const hasSelectedRows =
    table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected();

  return (
    <div>
      <div className="flex flex-col items-start py-4 gap-2 w-full">
        {filter === "global" && (
          <Col className="w-full">
            <Heading
              level="h4"
              className={cn(globalFilter !== "" && "text-teal-500")}
            >
              {t("Suodata", { ns: "components" })}
            </Heading>
            <Input
              placeholder={t("Kirjoita...", { ns: "components" })}
              value={globalFilter}
              onChange={(event) => {
                table.setGlobalFilter(event.target.value);
              }}
              className="w-full"
            />
          </Col>
        )}
        {additionalFilters && additionalFilters.map((filter) => filter)}
      </div>
      {tableTitle && (
        <Heading level="h3" className="mb-4">
          {tableTitle}
        </Heading>
      )}
      <div className="rounded-md border">
        <Table className="scrollbar scrollbar-thumb-slate-500 scrollbar-w-2">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="scrollbar scrollbar-thumb-slate-500 scrollbar-w-2">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {t("Ei tuloksia", { ns: "components" })}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className={"flex items-center space-x-2 py-4 justify-end"}>
        {onRowsDeleted && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className={cn(
                  "scale-0 transition-transform duration-200 mr-4",
                  hasSelectedRows && "scale-100"
                )}
              >
                {t("Poista valitut", { ns: "components" })}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {t("Poista valitut", { ns: "components" })}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {t(
                    "Tätä toimintoa ei voi peruuttaa. Valitut kohteet poistetaan pysyvästi. Haluatko varmasti jatkaa?",
                    { ns: "components" }
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {t("Peruuta", { ns: "components" })}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    const selectedFiltered = table
                      .getFilteredSelectedRowModel()
                      .rows.map((row) => row.id);

                    onRowsDeleted(selectedFiltered);
                  }}
                >
                  {t("Jatka", { ns: "components" })}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {t("Edellinen", { ns: "components" })}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {t("Seuraava", { ns: "components" })}
        </Button>
      </div>
    </div>
  );
}

type SortableHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  label: string;
};

export function SortableHeader<TData, TValue>({
  column,
  label,
}: SortableHeaderProps<TData, TValue>) {
  const getArrow = (sort: false | "asc" | "desc") => {
    switch (sort) {
      case false:
        return;
      case "asc":
        return <ArrowDown className="ml-2 h-4 w-4" />;
      default:
        return <ArrowUp className="ml-2 h-4 w-4" />;
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className={cn(
        "ml-3 mr-3",
        column.getCanSort() && column.getIsSorted() !== false && "ml-0 mr-0"
      )}
    >
      {label}
      {column.getCanSort() && getArrow(column.getIsSorted())}
    </Button>
  );
}
