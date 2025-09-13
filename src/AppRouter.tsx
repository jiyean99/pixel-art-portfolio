import { BrowserRouter, Routes, Route } from "react-router-dom";
import BasicLayout from "./layout/BasicLayout";
import Home from "./containers/views/Home";

const AppRouter = () => (
  <BrowserRouter>
    <BasicLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/career" element={<div>career</div>} />
        <Route path="/project" element={<div>project</div>} />
        <Route path="/contact" element={<div>contact</div>} />
      </Routes>
    </BasicLayout>
  </BrowserRouter>
);

export default AppRouter;
