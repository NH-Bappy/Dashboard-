"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// -------- ZOD Schema --------
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
});

const CreateSubcategory = () => {
  const [categories, setCategories] = useState([]);

  // Example: Fetch category list from backend
  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetch("http://localhost:5000/api/category/all");
      const data = await res.json();
      setCategories(data);
    };

    fetchCategory();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
    },
  });

  const onSubmit = (values) => {
    console.log("Submitted Data:", values);
    // API CALL HERE
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-xl border shadow-sm bg-white">
      <h2 className="text-2xl font-semibold mb-6">Create Subcategory</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* NAME FIELD */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>* Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter subcategory name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CATEGORY DROPDOWN */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>* Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Create Subcategory
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateSubcategory;
