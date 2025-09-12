"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
}

type SortDirection = "asc" | "desc" | null;

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  className
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: SortDirection;
  }>({ key: "", direction: null });

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    const key = column.key as string;
    let direction: SortDirection = "asc";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
      }
    }

    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.direction || !sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const getValue = (row: T, key: keyof T | string): any => {
    return row[key as keyof T];
  };

  return (
    <div className={cn("rounded-2xl border border-gray-200 bg-white shadow-sm", className)}>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-gray-100">
            {columns.map((column) => (
              <TableHead
                key={column.key as string}
                className={cn(
                  "font-semibold text-gray-700 py-4 px-6",
                  column.sortable && "cursor-pointer hover:bg-gray-50",
                  column.className
                )}
                onClick={() => handleSort(column)}
              >
                <div className="flex items-center space-x-2">
                  <span>{column.header}</span>
                  {column.sortable && (
                    <div className="flex flex-col">
                      <ChevronUp
                        className={cn(
                          "h-3 w-3 -mb-1",
                          sortConfig.key === column.key && sortConfig.direction === "asc"
                            ? "text-sky-600"
                            : "text-gray-400"
                        )}
                      />
                      <ChevronDown
                        className={cn(
                          "h-3 w-3",
                          sortConfig.key === column.key && sortConfig.direction === "desc"
                            ? "text-sky-600"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((row, index) => (
            <TableRow key={index} className="hover:bg-gray-50/50 border-b border-gray-50 last:border-0">
              {columns.map((column) => (
                <TableCell key={column.key as string} className={cn("py-4 px-6", column.className)}>
                  {column.render
                    ? column.render(getValue(row, column.key), row)
                    : getValue(row, column.key)
                  }
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}