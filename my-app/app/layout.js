"use client";

import { ThemeProviderWrapper } from "../config/Theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";  
import ResponsiveAppBar from "../components/ResponsiveAppBar";  
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from "react-redux";
import { store } from "../context/store/store";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProviderWrapper>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <LayoutContent>{children}</LayoutContent>  
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Provider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}

 
function LayoutContent({ children }) {
  const theme = useTheme();  

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.background.paper,  
      }}
    >
      <CssBaseline />
      <ResponsiveAppBar />
      {children}
    </Box>
  );
}
