import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Profile from "./pages/Profile";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotFound from "./pages/404";
import Home from "./pages/Home";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Home />} />
              <Route path={"/404"} element={<NotFound />} />
              <Route path={"/:id"} element={<Profile/>} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)
