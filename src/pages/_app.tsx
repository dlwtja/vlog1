import "../styles/global.ts";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { store } from "../../src/core/store";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import LayoutInner from "../../components/Layouts/LayoutInner";
import { DefaultLayout } from "../../components/Layouts";

import "react-loading-skeleton/dist/skeleton.css";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      // onError: handlerError
      // suspense: true
    },
    mutations: {
      // onError: handlerError
    },
  },
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <DefaultLayout>
            <LayoutInner>
              <Component {...pageProps} />
            </LayoutInner>
          </DefaultLayout>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
