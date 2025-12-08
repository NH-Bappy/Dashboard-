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
import { api } from "../../../helpers/Axios";
import { useState } from "react";

// ---- Zod Schema ----
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
  image: z.instanceof(File, {
    message: "Image is required",
  }),
});

export function CreateCategory() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  async function onSubmit(values) {
    // console.log("Submitting category:", values);

    // this is using for converting data into from data
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", values.image);

    // console.log(formData.get("image"));
    // console.log(formData.get("name"));

    // Example: send to backend
    try {
      setLoading(true);
      const sendToBackend = await api.post(
        "/category/create-category",
        formData
      );
      // console.log(sendToBackend);
      if (sendToBackend.status == 201) {
        console.log(sendToBackend.data);
      }
    } catch (error) {
        console.log(error.response?.data?.message || "Something went wrong" ,error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file); // store file in RHF
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {loading ? "loading..." : "create-category"}
        </Button>
      </form>
    </Form>
  );
}
