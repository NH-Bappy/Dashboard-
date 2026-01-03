"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getProductService } from "../../../hooks/api";
import { Link } from "react-router";
import { useVirtualizer } from "@tanstack/react-virtual";

export default function ProductList() {
  const parentRef = React.useRef(null);

  const { data, isPending, isError, error } = getProductService("single");

  const products = data?.data ?? [];

  const rowVirtualizer = useVirtualizer({
    count: products.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60, // row height
    overscan: 5,
  });

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Product List</CardTitle>
      </CardHeader>

      <CardContent>
        {/* SCROLL CONTAINER */}
        <div
          ref={parentRef}
          style={{
            height: "400px",
            overflow: "auto",
          }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                position: "relative",
              }}
            >
              {isPending && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              )}

              {isError && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-red-500">
                    {error.message}
                  </TableCell>
                </TableRow>
              )}

              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const product = products[virtualRow.index];
                if (!product) return null;

                return (
                  <TableRow
                    key={product._id}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <TableCell>
                      <Avatar className="h-10 w-10 rounded-lg">
                        <AvatarImage src={product.image} />
                        <AvatarFallback>
                          {product.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>

                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>

                    <TableCell className="text-right">
                      <Link to={`/product-details/${product.slug}`}>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
