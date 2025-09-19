import { HashRouter, Routes, Route } from "react-router-dom";
import BasicLayout from "./layout/BasicLayout";
import Home from "./containers/views/Home";
import Career from "./containers/views/Career";
import Project from "./containers/views/Project";
import Contact from "./containers/views/Contact";

import { useEffect } from "react";

const AppRouter = () => {
  const basename = import.meta.env.VITE_BASENAME || "";

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <HashRouter basename={basename}>
      <BasicLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/career" element={<Career />} />
          <Route path="/project" element={<Project />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BasicLayout>
    </HashRouter>
  );
};

export default AppRouter;
