import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
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
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Col } from "@/components/ui/rowcol";
import { Heading } from "@/components/ui/headings";
import { DataTablePagination } from "@/components/ui/data-table-pagination";

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
  onRowClick?: (row: TData) => void;
  hidePagination?: boolean;
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
  onRowClick,
  hidePagination,
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
    <div className="w-full">
      <div className="flex flex-col items-start gap-2 w-full">
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
                  onClick={() => {
                    if (onRowClick) {
                      onRowClick(row.original);
                    }
                  }}
                  className={cn(onRowClick && "cursor-pointer")}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="whitespace-pre-wrap" key={cell.id}>
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
        {!hidePagination && <DataTablePagination table={table} />}
      </div>
    </div>
  );
}
