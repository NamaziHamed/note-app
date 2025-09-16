import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import AuthProvider from "./auth-provider";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute={"class"}
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
