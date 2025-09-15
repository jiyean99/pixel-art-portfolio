import { BrowserRouter, Routes, Route } from "react-router-dom";
import BasicLayout from "./layout/BasicLayout";
import Home from "./containers/views/Home";
import Career from "./containers/views/Career";
import Project from "./containers/views/Project";
import Contact from "./containers/views/Contact";

const AppRouter = () => (
  <BrowserRouter basename="/pixel-art-portfolio">
    <BasicLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/career" element={<Career />} />
        <Route path="/project" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BasicLayout>
  </BrowserRouter>
);

export default AppRouter;
