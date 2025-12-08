import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { api } from "../helpers/Axios";
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