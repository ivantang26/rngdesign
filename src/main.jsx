import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { DemoProvider } from "./DemoContext";
import "./styles.css";

createRoot(document.getElementById("root")).render(<React.StrictMode><DemoProvider><App /></DemoProvider></React.StrictMode>);
