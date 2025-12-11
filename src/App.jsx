import CategoryList from "./components/dashboard/category/CategoryList";
import { CreateCategory } from "./components/dashboard/category/CreateCategory";
import CreateSubcategory from "./components/dashboard/subcategory/CreateSubcategory";



// import { CategoryList } from "./components/dashboard/CategoryList"
import { LoginForm } from "./components/login-form";
import { SignupForm } from "./components/signup-form";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer, toast } from "react-toastify";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import SubcategoryList from "./components/dashboard/subcategory/subcategoryList";
import CreateBrand from "./components/dashboard/brand/CreateBrand";
import BrandList from "./components/dashboard/brand/BrandList";
function App() {
const queryClient = new QueryClient();



  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/create-category" element={<CreateCategory />} />
              <Route path="/category-list" element={<CategoryList />} />
              <Route
                path="/create-subcategory"
                element={<CreateSubcategory />}
              />
              <Route path="/subcategory-list" element={<SubcategoryList />} />
              <Route path="/create-brand" element={<CreateBrand />} />
              <Route path="/find-all-brand" element={<BrandList />} />
              <Route path="*" element={"not found"} />
            </Route>
            {/* auth */}
            <Route path="/Login" element={<LoginForm />} />
            <Route path="/SingUp" element={<SignupForm />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />,
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}

export default App;
