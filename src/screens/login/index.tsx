// import { login } from "auth-provider";
import { useAuth } from "context/auth-context";
import { FormEvent } from "react";
// import { clearnObject } from "utils";

// interface Base {
//   id: number
// }
//
// interface Advance extends Base {
//   name: string
// }
//
// const test = (p: Base) => {
// }
//
// // 鸭子类型(duck typing)：面向接口编程 而不是 面向对象编程,只要接口符合即可,
// // 但在java中是不允許的
// const a = {id: 1, name: 'jack'}
// test(a)


export const LoginScreen = () => {
  const {login,user} = useAuth()
  // const login = (param: { username: string; password: string }) => {
    
  // };

  // HTMLFormElement extends Element
  const handleSubmit = (event: FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      {
        user? <div>
          登入成功,用戶名:{user.name}<p/> 
          token:{user.token}
        </div> : null
      }
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"} />
      </div>
      <button type={"submit"}>登入</button>
    </form>
  );
};