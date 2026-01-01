"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";

// example hooks (adjust import path)
import { deleteProduct, getProductService } from "../../../hooks/api";

const MultipleVariantList = () => {
  const { data, isPending, refetch } = getProductService();

  const deleteService = deleteProduct(() => {
    refetch(); // refresh list after delete
  });

  if (isPending) {
    return <p>Loading products...</p>;
  }

  const products =
    data?.data?.filter(
      (product) => product.variantType === "multipleVariant"
    ) || [];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Multiple Variant Products</h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found</p>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Category</th>
                <th className="border p-2 text-left">Brand</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="border p-2">{product.name}</td>
                  <td className="border p-2">
                    {product.category?.name || "—"}
                  </td>
                  <td className="border p-2">{product.brand?.name || "—"}</td>

                  <td className="border p-2 text-center space-x-2">
                    {/* UPDATE */}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        (window.location.href = `/dashboard/product/edit/${product._id}`)
                      }
                    >
                      <Edit size={16} />
                    </Button>

                    {/* DELETE */}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        if (
                          confirm("Are you sure you want to delete this product?")
                        ) {
                          deleteService.mutate(product._id);
                        }
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MultipleVariantList;
