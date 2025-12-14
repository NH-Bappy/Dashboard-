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

export default function ProductList() {


    const { data, isPending, isError, error, refetch } =
    getProductService("single");

    console.log(data?.data)




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
            {/* Row 1 */}
            <TableRow>
              <TableCell>
                <Avatar className="h-10 w-10 rounded-lg">
                  <AvatarImage src="https://via.placeholder.com/80" />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">Sample Product</TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="outline">
                  View
                </Button>
              </TableCell>
            </TableRow>

            {/* Row 2 */}
            <TableRow>
              <TableCell>
                <Avatar className="h-10 w-10 rounded-lg">
                  <AvatarImage src="https://via.placeholder.com/80" />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">Another Product</TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="outline">
                  View
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
