"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";

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
  createProductService,
  getAllBrand,
  getallCategoryForSubcategory,
} from "../../../hooks/api";

/* ----------------------------------
   ZOD SCHEMA
---------------------------------- */
const schema = z.object({
  name: z.string().min(2, "Product name is required"),
  description: z.string().min(10, "Description is required"),

  category: z.string().min(1, "Category is required"),
  subCategory: z.string().nullable().optional(),
  brand: z.string().nullable().optional(),
  manufactureCountry: z.string().min(1, "Country is required"),

  warrantyInformation: z.string().optional(),
  warrantyExpires: z.string(),

  shippingInformation: z.string(),

  variantType: z.literal("multipleVariant"),
});

export default function CreateVariantProduct() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      subCategory: "",
      brand: "",
      tag: [],
      manufactureCountry: "",
      warrantyInformation: "",
      warrantyExpires: "",
      shippingInformation: "",
      variantType: "multipleVariant",
    },
  });

  const [subcategoryList, setSubcategoryList] = useState([]);

  /* ----------------------------------
     API HOOKS
  ---------------------------------- */
  const { data: categoryData, isPending: categoryPending } =
    getallCategoryForSubcategory();

  const { data: brandData, isPending: brandPending } = getAllBrand();

  const productService = createProductService(() => form.reset());

  /* ----------------------------------
     CATEGORY → SUBCATEGORY LOGIC
  ---------------------------------- */
  useEffect(() => {
    const categoryId = form.watch("category");

    if (!categoryId) {
      setSubcategoryList([]);
      form.setValue("subCategory", null);
      return;
    }

    const selectedCategory = categoryData?.data?.find(
      (cat) => cat._id === categoryId
    );

    setSubcategoryList(selectedCategory?.subCategory ?? []);
    form.setValue("subCategory", null);
  }, [form.watch("category"), categoryData]);

  /* ----------------------------------
     SUBMIT
  ---------------------------------- */
  const onSubmit = (values) => {
    productService.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Product Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
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

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <select
                  {...field}
                  disabled={categoryPending}
                  className="border p-2 w-full rounded"
                >
                  <option value="">Select Category</option>
                  {categoryData?.data?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Sub Category */}
        <FormField
          control={form.control}
          name="subCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub Category</FormLabel>
              <FormControl>
                <select
                  className="border p-2 w-full rounded"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value || null)}
                  disabled={subcategoryList.length === 0}
                >
                  <option value="">No Sub Category</option>
                  {subcategoryList.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Brand */}
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <FormControl>
                <select
                  {...field}
                  disabled={brandPending}
                  className="border p-2 w-full rounded"
                >
                  <option value="">Select Brand</option>
                  {brandData?.data?.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </FormControl>
            </FormItem>
          )}
        />

        {/* TAGS */}
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type a tag and press Enter"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const value = e.currentTarget.value.trim();
                      if (!value) return;
                      if (!field.value.includes(value)) {
                        field.onChange([...field.value, value]);
                      }
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </FormControl>

              <div className="flex flex-wrap gap-2 mt-2">
                {field.value.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 px-3 py-1 rounded text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() =>
                        field.onChange(
                          field.value.filter((_, i) => i !== index)
                        )
                      }
                      className="text-red-500 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Manufacture Country */}
        <FormField
          control={form.control}
          name="manufactureCountry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Manufacture Country</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Warranty Info */}
        <FormField
          control={form.control}
          name="warrantyInformation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Warranty Information</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Warranty Expires */}
        <FormField
          control={form.control}
          name="warrantyExpires"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Warranty Expires</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Shipping Info */}
        <FormField
          control={form.control}
          name="shippingInformation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shipping Information</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">
          {productService.isPending ? "Creating..." : "Create Variant Product"}
        </Button>
      </form>
    </Form>
  );
}
