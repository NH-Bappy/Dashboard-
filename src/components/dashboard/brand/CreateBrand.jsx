"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// shadcn components (assumes you have them set up in your project)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

// Validation schema using zod
const currentYear = new Date().getFullYear();
const schema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  since: z
    .number({ invalid_type_error: "Must be a number" })
    .int()
    .gte(1900, "Year must be >= 1900")
    .lte(currentYear, `Year must be <= ${currentYear}`),
  description: z.string().optional(),
  image: z
    .any()
    .optional()
    .refine((f) => {
      if (!f) return true; // optional
      // react-hook-form gives FileList or File
      const file = f instanceof FileList ? f[0] : f;
      if (!file) return true;
      return file.type.startsWith("image/");
    }, "File must be an image"),
});

export default function CreateBrand() {
  const [previewUrl, setPreviewUrl] = useState(null);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "iPhone",
      since: 2005,
      description: "This is my field.",
      image: undefined,
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { isSubmitting },
  } = form;

  const watchedImage = watch("image");

  // keep preview in sync if user picks a file
  React.useEffect(() => {
    if (!watchedImage) {
      setPreviewUrl(null);
      return;
    }
    const file = watchedImage instanceof FileList ? watchedImage[0] : watchedImage;
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [watchedImage]);

  async function onSubmit(values) {
    // normalize image field to a single File or undefined
    const file = values.image instanceof FileList ? values.image[0] : values.image;

    // Example: client-side validation for file size (optional)
    if (file && file.size > 5 * 1024 * 1024) {
      console.log("Image is too large (max 5 MB)");
      return;
    }








  }

  return (
    <Card className="max-w-2xl mx-auto mt-8 shadow-lg">
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Product name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="since"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Since (year)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      placeholder="e.g. 2005"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image (optional)</FormLabel>
                  <FormControl>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const fileList = e.target.files;
                        setValue("image", fileList);
                        field.onChange(fileList);
                      }}
                      className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-zinc-100"
                    />
                  </FormControl>
                  <FormMessage />

                  {previewUrl && (
                    <div className="mt-3">
                      <p className="text-sm font-medium">Preview</p>
                      <img src={previewUrl} alt="preview" className="mt-2 max-h-48 rounded" />
                    </div>
                  )}
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end gap-2">
              <Button type="submit" disabled={isSubmitting}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
