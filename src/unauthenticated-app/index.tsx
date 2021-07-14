import { useState } from "react"
import { LoginScreen } from "./login"
import { RegisterScreen } from "./register"

export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false);

    return <div>
        {
            isRegister?  <RegisterScreen/> : <LoginScreen/>
        }
        <button onClick={() => setIsRegister(!isRegister)}>切換到{isRegister? '登入' : '註冊' }</button>
    </div>
}