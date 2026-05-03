import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import ComboProspectingApp from "./ComboProspectingApp"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ComboProspectingApp />
  </StrictMode>,
)
