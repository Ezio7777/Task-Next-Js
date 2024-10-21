// app/layout.tsx (This should be in the root of your app directory)
import { TaskProvider } from "@/src/context/TaskContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TaskProvider>{children}</TaskProvider>
      </body>
    </html>
  );
}
