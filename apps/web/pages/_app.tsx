import type { AppProps } from "next/app";
import "@unocss/reset/tailwind.css";
import "uno.css";
import { initClient } from "@ts-rest/core";
import { apiContract } from "../../api/src/contract";

export const apiClient = initClient(apiContract, {
  baseUrl: "http://localhost:3001",
  baseHeaders: {},
});

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
