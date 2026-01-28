import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./components/Layout/Layout.tsx";
import { AuthModal } from "./components/AuthModal/AuthModal.tsx";
import { Modal } from "./components/Modal/Modal.tsx";

createRoot(document.getElementById("root")!).render(<Layout />);
