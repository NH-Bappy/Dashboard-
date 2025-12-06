import CategoryList from "./components/dashboard/CategoryList";
import { CreateCategory } from "./components/dashboard/CreateCategory";
import CreateSubcategory from "./components/dashboard/subcategory/CreateSubcategory";

// import { CategoryList } from "./components/dashboard/CategoryList"
import { LoginForm } from "./components/login-form";
import { SignupForm } from "./components/signup-form";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
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
              <Route
                path="/subcategory-list"
                element={"hello subcategory world"}
              />
              <Route path="*" element={"not found"} />
            </Route>
            {/* auth */}
            <Route path="/Login" element={<LoginForm />} />
            <Route path="/SingUp" element={<SignupForm />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />,
      </QueryClientProvider>
    </>
  );
}

export default App;
