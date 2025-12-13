import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { api } from "../helpers/Axios";
import {sendSuccessToast} from "../helpers/toast"
const queryClient = new QueryClient()

//get all category for subcategory
export const getallCategoryForSubcategory = () => {
  return useQuery({
    queryKey: ["getallCategoryForSubcategory"],
    queryFn: async () => {
      const response = await api.get("/category/find-all-category");
      return response.data;
    },
  });
};

//create subcategory
export const createSubcategory = (reset) => {
  return useMutation({
    queryKey: ["createSubcategoryQueryKey"],
    mutationFn: (data) => {
      return api.post("/subcategory/create-subcategory", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onError: (error, variables, onMutateResult, context) => {
      // An error happened!
      console.log(error);
      console.log(`rolling back optimistic update with id ${onMutateResult}`);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onSettled: (data, error, variables, onMutateResult, context) => {
      // Error or success... doesn't matter!
      reset()
    },
  });
};

export const createBrand = (reset) => {
  return useMutation({
    mutationFn: (value) => {
      const imagePath = value.image[0];
      //Because normal JSON cannot send files (images).
      //We use FormData() because it is the only way to upload files + text together.
      const payload = new FormData();
      payload.append("name", value.name);
      payload.append("since", value.since);
      payload.append("image", imagePath);
      return api.post("/brand/add-brand", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onError: (error, variables, onMutateResult, context) => {
      // An error happened!
      console.log(error);
      console.log(`rolling back optimistic update with id ${onMutateResult}`);
    },
    onSuccess: (data) => {
      console.log("brand created successfully",data);
      sendSuccessToast("brand created successfully")
    },
    onSettled: () => {
      reset()
    },
  });
}

// get all brand
export const getAllBrand = () => {
  return useQuery({
    queryKey:["getAllBrand"],
    queryFn: async () => {
      const allData = await api.get("brand/all-brand");
      return allData.data;
    }
  })
}


