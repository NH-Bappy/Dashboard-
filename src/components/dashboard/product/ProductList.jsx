"use client";

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

export default function ProductList() {


    const { data, isPending, isError, error, refetch } =
    getProductService("single");

    // console.log(data?.data)




  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Product List</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
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

            {data?.data?.map((product) => (
              <TableRow key={product._id}>
                {/* Image */}
                <TableCell>
                  <Avatar className="h-10 w-10 rounded-lg">
                    <AvatarImage src={product.image} />
                    <AvatarFallback>{product.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>

                {/* Name */}
                <TableCell className="font-medium">{product.name}</TableCell>

                {/* Action */}
                <TableCell className="text-right">
                  <Link to={`/product-details/${product.slug}`}>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
