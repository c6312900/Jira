import { createContext, ReactNode, useContext } from "react"; //, useState
import * as auth from "auth-provider";
import { User } from "types/User";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageLoading, FullyPageErrorFallBack } from "components/lib";
import { useQueryClient } from "react-query";

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
  // const [user, setUser] = useState<User | null>(null);
   const {data: user, error, isLoading, isIdle, isError, run, setData: setUser } = useAsync<User | null>()
   const queryClient = useQueryClient()
                                            //user => setUser(user) 等於setUser 叫 point free
   const login = (form: AuthForm) => auth.login(form).then(setUser);
   const register = (form: AuthForm) => auth.register(form).then(setUser);
   const logout = () => auth.logout().then(() => {
      setUser(null)
      queryClient.clear()
    });

   useMount(() => {
    // bootstrapUser().then(setUser)
     run(bootstrapUser())
   });

   if (isIdle || isLoading) 
   return <FullPageLoading/> 

   if (isError) 
   return <FullyPageErrorFallBack error={error}/>
  
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