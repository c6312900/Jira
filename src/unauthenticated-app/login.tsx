import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";
// import { FormEvent } from "react";
// import { login } from "auth-provider";
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
  const {login} = useAuth();
  // const login = (param: {username: string; password: string }) => {    
  // };

  // HTMLFormElement extends Element
  // const handleSubmit = (event: FormEvent<HTMLFormElement> ) => {
  //   event.preventDefault();
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
  //   login({ username, password });
  // };

  const handleSubmit = (values: { username: string; password: string }) => {
    console.log(values);
    login(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name={'username'} rules={[{ required: true, message: "请输入用戶名" }]}>
        {/* <label htmlFor="username">用户名</label> */}
        <Input placeholder={'用户名'} type="text" id={"username"} />
      </Form.Item>
      <Form.Item name={'password'} rules={[{ required: true, message: "请输入密码" }]}>
        {/* <label htmlFor="password">密码</label> */}
        <Input placeholder={'密码'} type="current-password" id={"password"} />
        {/* <input type="password" id={"password"} /> */}
      </Form.Item>
      <LongButton htmlType={"submit"} type={"primary"}>登入</LongButton>
    </Form>
  );
};