import { CreateCategory } from "./components/dashboard/CreateCategory";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/create-category" element={<CreateCategory/>} />
            <Route path="/category-list" element={"hello category world"} />
            <Route path="/create-subcategory" element={"hello subcategory"} />
            <Route path="/subcategory-list" element={"hello subcategory world"} />
            <Route path="*" element={"not found"} />
          </Route>
        </Routes>
      </BrowserRouter>
      ,
    </>
  );
}

export default App;
