import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} >
            <Route path="/create-category" element={"hello world"}/>
            <Route path="/category-list" element={"hello category world"}/>
          </Route>
        </Routes>
      </BrowserRouter>,
    </>
  );
}

export default App;
