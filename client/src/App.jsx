import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "./components/Home/Index";

const router = createBrowserRouter(
  [
    { path: "/", element: <HomePage /> },
    { path: "*", element: "<PageNotFound />" },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

function App() {
  return (
    <RouterProvider future={{ v7_startTransition: true }} router={router} />
  );
}

export default App;
