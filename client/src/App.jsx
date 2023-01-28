import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Home from "./scenes/home/index";
import Post from "./scenes/post/index";
import Header from "./components/Header";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<Post />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
};
export default App;
