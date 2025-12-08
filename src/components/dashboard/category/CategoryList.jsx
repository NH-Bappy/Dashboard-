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
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "../../../helpers/Axios";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [open, setOpen] = useState(false);

  // Fetch categories
  useEffect(() => {
    const abort = new AbortController();

    const fetchCategories = async () => {
      try {
        const res = await api.get("/category/find-all-category", {
          signal: abort.signal,
        });

        setCategories(res.data.data);
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.log("Error from category list:", error);
        }
      }
    };

    fetchCategories();
    return () => abort.abort();
  }, []);

  // Load selected category into modal
  useEffect(() => {
    if (selectedCat) {
      setNewName(selectedCat.name);
      setPreviewImage(selectedCat.image);
    }
  }, [selectedCat]);

  // DELETE
  const handleDelete = async (slug) => {
    try {
      await api.delete(`/category/remove-category/${slug}`);
      setCategories((prev) => prev.filter((cat) => cat.slug !== slug));
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  // IMAGE CHANGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!selectedCat) return;

    const formData = new FormData();
    formData.append("name", newName);
    if (newImage) formData.append("image", newImage);

    try {
      const res = await api.put(
        `/category/edit-category/${selectedCat.slug}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setCategories((prev) =>
        prev.map((item) =>
          item.slug === selectedCat.slug ? res.data.data : item
        )
      );

      setOpen(false);
      setSelectedCat(null);
      setNewName("");
      setNewImage(null);
      setPreviewImage(null);
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Category List</h2>

      {/* SINGLE DIALOG OUTSIDE THE MAP */}
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            document.activeElement?.blur();
          }
          setOpen(isOpen);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update your category information from here.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <input
              type="text"
              className="border p-2 w-full rounded"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />

            <input type="file" accept="image/*" onChange={handleImageChange} />

            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full rounded border"
              />
            )}

            <Button onClick={handleUpdate}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* TABLE */}
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
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCat(cat);
                    setOpen(true);
                  }}
                >
                  Edit
                </Button>
              </TableCell>

              <TableCell>
                <Button
                  variant="destructive"
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
