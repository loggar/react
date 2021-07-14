// npm install react-query react-query-devtools

import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FetchData />
    </QueryClientProvider>
  );
}

function FetchData() {
  const { data } = useQuery("UserData", () =>
    fetch("http://www.abc.cd/test").then((res) => res.json())
  );

  return (
    <div>
      // data you want to show
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
