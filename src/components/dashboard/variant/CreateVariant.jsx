"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

/* ---------------- SHADCN UI ---------------- */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

/* ---------------- MOCK PRODUCT DATA ---------------- */
const products = [
  { _id: "68d8b89652d7d9474f81e810", name: "iPhone" },
  { _id: "68d8b89652d7d9474f81e811", name: "Samsung Galaxy" },
  { _id: "68d8b89652d7d9474f81e812", name: "Pixel Phone" },
];

/* ---------------- ZOD SCHEMA ---------------- */
const variantSchema = z.object({
  product: z.string().min(1, "Product is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  size: z.string().min(1, "Size is required"),
  color: z.string().min(1, "Color is required"),
  stockVariant: z.coerce.number(),
  alertVariantStock: z.coerce.number(),
  retailPrice: z.coerce.number(),
  wholesalePrice: z.coerce.number(),
  image: z.any().optional(),
});

const CreateVariant = () => {
  const [preview, setPreview] = useState(null);

  const form = useForm({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      product: "",
      name: "",
      description: "",
      size: "",
      color: "",
      stockVariant: 0,
      alertVariantStock: 0,
      retailPrice: 0,
      wholesalePrice: 0,
      image: null,
    },
  });

  /* ---------------- SUBMIT (NO BACKEND) ---------------- */
  const onSubmit = (values) => {
    console.log("✅ Variant Data:", values);
    alert("Variant created successfully (frontend only)");
    form.reset();
    setPreview(null);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl bg-white">
      <h2 className="text-2xl font-semibold mb-6">Create Variant</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* PRODUCT DROPDOWN */}
          <FormField
            control={form.control}
            name="product"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product._id} value={product._id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* NAME */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* DESCRIPTION */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SIZE */}
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* COLOR */}
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* STOCK */}
          <FormField
            control={form.control}
            name="stockVariant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* ALERT STOCK */}
          <FormField
            control={form.control}
            name="alertVariantStock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alert Stock</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* PRICES */}
          <FormField
            control={form.control}
            name="retailPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Retail Price</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="wholesalePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wholesale Price</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* IMAGE */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Variant Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                      if (file) setPreview(URL.createObjectURL(file));
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* IMAGE PREVIEW */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded border"
            />
          )}

          <Button type="submit" className="w-full">
            Create Variant
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateVariant;
