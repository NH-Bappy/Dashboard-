"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { createProductService, getAllBrand, getallCategoryForSubcategory } from "../../../hooks/api";
import { useEffect, useState } from "react";

// ---------------------------------------------
// ZOD SCHEMA
// ---------------------------------------------
const schema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),

  category: z.string(),
  subCategory: z.string(),
  brand: z.string(),

  // tag: z.array(z.string() ).default([]),

  manufactureCountry: z.string(),
  rating: z.coerce.number().min(0).max(5),

  warrantyInformation: z.string().optional(),
  warrantyExpires: z.string(),

  shippingInformation: z.string(),
  sku: z.string(),

  groupUnit: z.enum(["Box", "Packet", "Dozen", "Custom"]),
  groupUnitQuantity: z.coerce.number(),

  unit: z.enum(["Piece", "Kg", "Gram", "Packet", "Custom"]),

  size: z.string(),
  color: z.string(),

  stock: z.coerce.number(),
  retailPrice: z.coerce.number(),
  wholesalePrice: z.coerce.number(),

  alertQuantity: z.coerce.number(),
  minimumOrderQuantity: z.coerce.number(),

  variantType: z.string(),

  image: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "Upload at least one image.",
    }),
});

export default function CreateProduct() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      subCategory: "",
      brand: "",
      // tag: [],
      manufactureCountry: "",
      rating: 0,
      warrantyInformation: "",
      warrantyExpires: "",
      shippingInformation: "",
      sku: "",
      groupUnit: "Box",
      groupUnitQuantity: 1,
      unit: "Piece",
      size: "",
      color: "",
      stock: 0,
      retailPrice: 0,
      wholesalePrice: 0,
      alertQuantity: 0,
      minimumOrderQuantity: 1,
      variantType: "singleVariant",
      image: undefined,
    },
  });

const [subcategoryList , setSubcategoryList] = useState([])



    // get all category
  const { data:categoryData , isPending:categoryPending } = getallCategoryForSubcategory();
  // console.log(categoryData?.data);
  // console.log(form.watch("category"));   //we use watch to see category id




  // get all brand
  const {data: brandData , isPending: brandPending} = getAllBrand();
  // console.log(brandData.data);


// fetch api
  const productService = createProductService(() => form.reset())







  // find category selected subcategory ID
  useEffect(() => {
    if (form.watch("category")) {
      const selectedCategory = categoryData?.data?.find(
        (item) => item._id == form.watch("category")
      );
      setSubcategoryList(selectedCategory?.subCategory || []);
    }
  }, [form.watch("category"), categoryData]);









  
  const onSubmit = (values) => {
    // console.log(values);
    form.reset();
    productService.mutate(values);








  };















  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <select
                  disabled={categoryPending}
                  className="border p-2 w-full rounded"
                  {...field}
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

        {/* subCategory */}

        <FormField
          disabled={subcategoryList?.length == 0 ? true : false}
          control={form.control}
          name="subCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub Category</FormLabel>
              <FormControl>
                <select
                  className="border p-2 w-full rounded"
                  {...field}
                  disabled={subcategoryList.length === 0}
                >
                  {subcategoryList.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* brand */}
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <FormControl>
                <select
                  className="border p-2 w-full rounded"
                  disabled={brandPending}
                  {...field}
                >
                  <option value="">Select Brand</option>
                  {brandData?.data?.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit</FormLabel>
              <FormControl>
                <select className="border p-2 w-full rounded" {...field}>
                  <option value="Piece">Piece</option>
                  <option value="Kg">Kg</option>
                  <option value="Gram">Gram</option>
                  <option value="Packet">Packet</option>
                  <option value="Custom">Custom</option>
                </select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="groupUnit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group Unit</FormLabel>
              <FormControl>
                <select className="border p-2 w-full rounded" {...field}>
                  <option value="Box">Box</option>
                  <option value="Packet">Packet</option>
                  <option value="Dozen">Dozen</option>
                  <option value="Custom">Custom</option>
                </select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="groupUnitQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group Unit Quantity</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="minimumOrderQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Order Quantity</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">
          {productService.isPending ? "loading..." : "Create Product"}
        </Button>
      </form>
    </Form>
  );
}
