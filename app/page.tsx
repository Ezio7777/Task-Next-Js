import { AppProps } from "next/app";
import { TaskProvider } from "@/src/context/TaskContext";
import Main from "@/src/components/Main";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TaskProvider>
      <Main {...pageProps} />
    </TaskProvider>
  );
}

export default MyApp;
