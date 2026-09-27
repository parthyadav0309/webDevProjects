import React from "react";
import { createRoot } from 'react-dom/client'
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// ReactDOM.render(
//   <div>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </div>,
//   document.getElementById("root")
// );
createRoot(document.getElementById("root")).render(
  <div>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </div>
);
