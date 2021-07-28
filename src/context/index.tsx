import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./auth-context";

export const AppProviders = ({children}:{children:ReactNode}) => {
 return  <QueryClientProvider client={new QueryClient()}>
    <AuthProvider>
       {/*  children 可看成從 <AppProviders> 下帶入的 <DevTools /> */}
       {children} 
    </AuthProvider>
 </QueryClientProvider>


};