import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MarkdownProvider } from "./context/MarkdownContext";
import GlobalStyles from "./styles/GlobalStyles";
import router from "./routes/Router";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <MarkdownProvider>
          <RouterProvider router={router} />
        </MarkdownProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
