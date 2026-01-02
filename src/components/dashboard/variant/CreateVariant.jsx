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
import { getProductService } from "../../../hooks/api";

/* ---------------- MOCK PRODUCT DATA ---------------- */

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
  sku: z.string().min(1, "SKU is required"),
  image: z.array(z.any()).optional(),
});

const CreateVariant = () => {
  const [preview, setPreview] = useState([]);
  const { data, isPending } = getProductService("multiple");
  // console.log(data?.data);

  const form = useForm({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      product: "",
      name: "",
      description: "",
      size: "",
      color: "",
      sku: "",
      stockVariant: 0,
      alertVariantStock: 0,
      retailPrice: 0,
      wholesalePrice: 0,
      image: [],
    },
  });

  const products = data?.data || [];


  // Auto-generate UNIQUE SKU
const generateSKU = () => {
  return `SKU-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};
  // Auto-fill SKU when form loads
  React.useEffect(() => {
    form.setValue("sku", generateSKU());
  }, []);




  /* ---------------- SUBMIT (NO BACKEND) ---------------- */
  const onSubmit = (values) => {
    console.log("✅ Variant Data:", values);
    alert("Variant created successfully (frontend only)");
    form.reset();
    setPreview([]);
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
          {/* sku */}
          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU</FormLabel>
                <FormControl>
                  <Input {...field} readOnly />
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
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      field.onChange(files);
                      setPreview(
                        files.map((file) => URL.createObjectURL(file))
                      );
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* IMAGE PREVIEW */}
          {preview.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {preview.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded border"
                />
              ))}
            </div>
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
