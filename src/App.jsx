import CategoryList from "./components/dashboard/category/CategoryList";
import CreateSubcategory from "./components/dashboard/subcategory/CreateSubcategory";



// import { CategoryList } from "./components/dashboard/CategoryList"
// import { LoginForm } from "./components/login-form";

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
import React, { Suspense } from "react";
import CreateProduct from "./components/dashboard/product/CreateProduct";

const Home = React.lazy(() => import("./pages/Home"));
const LoginForm = React.lazy(() =>
  import("./components/login-form").then((c) => ({ default: c.LoginForm }))
);
const SignupForm = React.lazy(() =>
  import("./components/signup-form").then((c) => ({ default: c.SignupForm }))
);
const CreateCategory = React.lazy(() =>
  import("./components/dashboard/category/CreateCategory").then((c) => ({
    default: c.CreateCategory,
  }))
);


// React.lazy for fast loading
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
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="*" element={"not found"} />
            </Route>
            {/* auth */}
            <Route
              path="/Login"
              element={
                <Suspense fallback={<h1>loading...</h1>}>
                  <LoginForm />
                </Suspense>
              }
            />

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
