"use client";

import React from "react";
import { useGetAllVariant } from "../../../hooks/api";

/* shadcn */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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

const VariantList = () => {
  const { data, isPending } = useGetAllVariant();
  const variants = data?.data || [];

  const handleUpdate = (id) => {
    console.log("Update variant:", id);
    // router.push(`/dashboard/variant/update/${id}`);
  };

  const handleDelete = (id) => {
    console.log("Delete variant:", id);
    // call delete API here
  };

  if (isPending) {
    return <p className="text-center py-10">Loading variants...</p>;
  }

  if (variants.length === 0) {
    return <p className="text-center py-10">No variants found</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {variants.map((variant) => {
        const lowStock = variant.stockVariant <= variant.alertVariantStock;

        return (
          <Card key={variant._id} className="overflow-hidden">
            {/* IMAGE + CAROUSEL */}
            <div className="relative">
              <Carousel className="w-full">
                <CarouselContent>
                  {variant.image?.map((img, index) => (
                    <CarouselItem key={index}>
                      <div className="h-48 w-full bg-muted">
                        <img
                          src={img}
                          alt={`${variant.name}-${index}`}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {variant.image?.length > 1 && (
                  <>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </>
                )}
              </Carousel>

              {/* IMAGE COUNT */}
              <Badge className="absolute right-2 top-2 z-10">
                {variant.image.length} Images
              </Badge>

              {/* LOW STOCK BADGE */}
              {lowStock && (
                <Badge
                  variant="destructive"
                  className="absolute left-2 top-2 z-10"
                >
                  Low Stock
                </Badge>
              )}
            </div>

            {/* HEADER */}
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{variant.name}</CardTitle>

                {variant.isActive ? (
                  <Badge>Active</Badge>
                ) : (
                  <Badge variant="destructive">Inactive</Badge>
                )}
              </div>

              <p className="text-sm text-muted-foreground capitalize">
                Color: {variant.color} · Size: {variant.size}
              </p>
            </CardHeader>

            {/* CONTENT */}
            <CardContent className="space-y-3 text-sm">
              {/* PRICES */}
              <div className="flex justify-between">
                <span>Retail Price</span>
                <span className="font-semibold">${variant.retailPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Wholesale Price</span>
                <span className="font-semibold">${variant.wholesalePrice}</span>
              </div>

              <Separator />

              {/* STOCK */}
              <div className="flex justify-between">
                <span>Stock</span>
                <span
                  className={`font-semibold ${
                    lowStock ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {variant.stockVariant}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Alert Stock</span>
                <span>{variant.alertVariantStock}</span>
              </div>

              <div className="flex justify-between">
                <span>Total Sale</span>
                <span>{variant.totalSale}</span>
              </div>

              <Separator />

              {/* DESCRIPTION */}
              <div>
                <p className="font-medium mb-1">Description</p>
                <p className="text-muted-foreground line-clamp-2">
                  {variant.description}
                </p>
              </div>

              <Separator />

              {/* META */}
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  Created: {new Date(variant.createdAt).toLocaleDateString()}
                </span>
                <span>
                  Updated: {new Date(variant.updatedAt).toLocaleDateString()}
                </span>
              </div>

              <Separator />

              {/* ACTION BUTTONS */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-1/2"
                  onClick={() => handleUpdate(variant._id)}
                >
                  Update
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="w-1/2">
                      Delete
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Variant</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this variant? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(variant._id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default VariantList;
