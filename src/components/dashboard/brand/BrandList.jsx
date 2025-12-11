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
} from "@/components/ui/dialog";
import { api } from "../../../helpers/Axios";
import { getAllBrand } from "../../../hooks/api";

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [open, setOpen] = useState(false);

  const { isPending, error, data, refetch, isError } = getAllBrand();
  // console.log(data?.data);



  // for real time delete data
  useEffect(() => {
    if (data?.data) {
      setBrands(data.data);
    }
  }, [data]); // runs ONLY when data changes from API




  // Delete brand
  const handleDelete = async (slug) => {
    // console.log(slug)
    try {
      await api.delete(`/brand/remove-item/${slug}`);
      setBrands((prev) => prev.filter((brand) => brand.slug !== slug));
    } catch (error) {
      console.log("Brand delete error:", error);
    }
  };

  // update brand
  // Load selected brand into modal
  useEffect(() => {
    if (selectedBrand) {
      setNewName(selectedBrand.name);
      setPreviewImage(selectedBrand.image);
    }
  }, [selectedBrand]);

  // Image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // Update brand
  const handleUpdate = async () => {
    if (!selectedBrand) return;

    const formData = new FormData();
    formData.append("name", newName);
    if (newImage) formData.append("image", newImage);

    try {
      const res = await api.put(
        `/brand/edit-brand/${selectedBrand.slug}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setBrands((prev) =>
        prev.map((item) =>
          item.slug === selectedBrand.slug ? res.data.data : item
        )
      );

      // Close modal
      setOpen(false);
      setSelectedBrand(null);
      setNewName("");
      setNewImage(null);
      setPreviewImage(null);
    } catch (error) {
      console.log("Update brand error:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Brand List</h2>

      {/* EDIT MODAL */}
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) document.activeElement?.blur();
          setOpen(isOpen);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Brand</DialogTitle>
            <DialogDescription>
              Update your brand information.
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
                className="w-full rounded border"
                alt="Preview"
              />
            )}

            <Button onClick={handleUpdate}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* TABLE */}
      <div className="p-6">
        {isPending && <h1>Loading...</h1>}
        {isError && <h2>Error loading brand list</h2>}

        {!isPending && !isError && (
          <>
            {
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
                  {brands.map((brand) => (
                    <TableRow key={brand._id}>
                      <TableCell className="font-medium">
                        {brand.name}
                      </TableCell>

                      <TableCell>
                        <img
                          src={brand.image}
                          alt="brand"
                          className="h-12 w-12 object-cover rounded-md border"
                        />
                      </TableCell>

                      <TableCell>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedBrand(brand);
                            setOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>

                      <TableCell>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(brand.slug)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            }
          </>
        )}
      </div>
    </div>
  );
};

export default BrandList;
