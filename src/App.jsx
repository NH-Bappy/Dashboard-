import CategoryList from "./components/dashboard/CategoryList";
import { CreateCategory } from "./components/dashboard/CreateCategory";
// import { CategoryList } from "./components/dashboard/CategoryList"
import { LoginForm } from "./components/login-form";
import { SignupForm } from "./components/signup-form";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/create-category" element={<CreateCategory />} />
            <Route path="/category-list" element={<CategoryList/>} />
            <Route path="/create-subcategory" element={"hello subcategory"} />
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
      ,
    </>
  );
}

export default App;
