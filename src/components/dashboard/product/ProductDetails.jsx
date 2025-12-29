import React from "react";
import { useParams } from "react-router";
import { getSingleProduct } from "../../../hooks/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ProductDetails = () => {
  const { slug } = useParams();
  const { data, isPending } = getSingleProduct(slug);

  if (isPending) {
    return <p className="p-6">Loading...</p>;
  }

  const product = data?.data;

  if (!product) {
    return <p className="p-6 text-red-500">Product not found</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* IMAGE */}
      <Card>
        <CardContent className="p-4">
          <img
            src={product.image?.[0]}
            alt={product.name}
            className="w-full h-96 object-cover rounded-xl"
          />
        </CardContent>
      </Card>

      {/* DETAILS */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{product.name}</CardTitle>
          <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* PRICE */}
          <div className="flex gap-4">
            <Badge variant="secondary">Retail: ৳{product.retailPrice}</Badge>
            <Badge variant="outline">
              Wholesale: ৳{product.wholesalePrice}
            </Badge>
          </div>

          {/* STOCK */}
          <p>
            <span className="font-medium">Stock:</span> {product.stock}{" "}
            {product.unit}
          </p>

          {/* CATEGORY */}
          <div className="flex gap-2 flex-wrap">
            <Badge>{product.category?.name}</Badge>

            {product.subCategory && (
              <Badge variant="outline">{product.subCategory?.name}</Badge>
            )}

            {product.brand && (
              <Badge variant="secondary">{product.brand?.name}</Badge>
            )}
          </div>

          <Separator />

          {/* DESCRIPTION */}
          <p className="text-sm leading-relaxed">{product.description}</p>

          <Separator />

          {/* EXTRA INFO */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <p>
              <span className="font-medium">Color:</span> {product.color}
            </p>
            <p>
              <span className="font-medium">Size:</span> {product.size}
            </p>
            <p>
              <span className="font-medium">Group Unit:</span>{" "}
              {product.groupUnit} ({product.groupUnitQuantity})
            </p>
            <p>
              <span className="font-medium">Min Order:</span>{" "}
              {product.minimumOrderQuantity}
            </p>
            <p>
              <span className="font-medium">Rating:</span> {product.rating}/5
            </p>
            <p>
              <span className="font-medium">Warranty Exp:</span>{" "}
              {new Date(product.warrantyExpires).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;
