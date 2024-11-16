import MainCon from "./components/MainCon";
import { RouterProvider } from "react-router-dom";
import { MarkdownProvider } from "./context/MarkdownContext";
import GlobalStyles from "./styles/GlobalStyles";
import router from "./routes/Router";

function App() {
  return (
    <>
      <GlobalStyles />
      <MarkdownProvider>
        <RouterProvider router={router} />
      </MarkdownProvider>
    </>
  );
}

export default App;
