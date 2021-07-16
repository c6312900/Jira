import { createContext, ReactNode, useContext, useState } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";

interface AuthForm {
    username: string;
    password: string;
}

const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken();
    if (token) {
        const data = await http("me", {token});
        user = data.user;        
    }
    return user;
}


const AuthContext = createContext<
{
 user: User | null;
 login: (form: AuthForm) => Promise<void>;
 register: (form: AuthForm) => Promise<void>;
 logout: () => Promise<void>;
} | undefined>(undefined);

AuthContext.displayName = 'AuthContex';



//頁面加載時會觸發
export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [user, setUser] = useState<User | null>(null);
                                            //user => setUser(user) 等於setUser 叫 point free
   const login = (form: AuthForm) => auth.login(form).then(setUser);
   const register = (form: AuthForm) => auth.register(form).then(setUser);
   const logout = () => auth.logout().then(user => setUser(null));

   useMount(() => {
    bootstrapUser().then(setUser)
   });
   console.log('AuthProvider')
   return (<AuthContext.Provider children={children} value={{user, login, register, logout}} />);
}




export const useAuth = () => {
    // console.log('useAuth')
 const context = useContext(AuthContext);
 if (!context) {
     throw new Error('useAuth必需在AuthProvider中使用')
 }
 return context;
}