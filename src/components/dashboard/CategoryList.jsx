import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "../../helpers/Axios";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

useEffect(() => {
  const abort = new AbortController();
  const fetchCategories = async () => {
    try {
      const res = await api.get("/category/find-all-category", {
        signal: abort.signal,
      });

      
      console.log("category data" , res.data);

      setCategories(res.data.data)

    } catch (error) {
      if (error.name === "CanceledError") {
        console.log("Request aborted");
      } else {
        console.log("Error from category list:", error);
      }
    }
  };
  fetchCategories();
  return () => abort.abort();
}, []);





const handleDelete = async (slug) => {
  try {
    const deleteResponse = await api.delete(
      `/category/remove-category/${slug}`
    );
    console.log("delete category:", deleteResponse);

    // Remove deleted item from UI
    setCategories((prev) => prev.filter((cat) => cat.slug !== slug));
  } catch (error) {
    console.log("Delete error:", error);
  }
};


  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Category List</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat._id}>
              <TableCell className="font-medium">{cat.name}</TableCell>
              <TableCell>
                <img
                  src={cat.image}
                  alt="category"
                  className="h-12 w-12 object-cover rounded-md border"
                />
              </TableCell>

              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Edit</Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Category</DialogTitle>
                    </DialogHeader>

                    {/* You will connect backend update here */}
                    <p>Edit form coming here...</p>
                  </DialogContent>
                </Dialog>
              </TableCell>

              <TableCell>
                <Button
                  variant="destructive"
                  className = "bg-green-500"
                  onClick={() => handleDelete(cat.slug)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryList;
