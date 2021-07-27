import { useAuth } from "context/auth-context";
import {  Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

export const RegisterScreen =  ({onError}: {onError: (error: Error) => void}) => {
  const {run, isLoading } = useAsync(undefined, {throwOnError: true});
  const {register} = useAuth();
  //{cpassword, ...values} 是表示解構後有{cpassword,username,password},但不想破壞values代表{username,password}
  //因為values會傳去server交互,不須傳cpassword
  const handleSubmit = async ({cpassword, ...values}: { username: string; password: string; cpassword: string }) => {
    try {
      if (cpassword !== values.password) {
        onError(new Error('請確認兩次輸入內容相同'))
        return
      }
      await  run(register(values));  
     // await register(values);
    } catch (e) {
      onError(e);
    }    
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name={'username'} rules={[{ required: true, message: "请输入用戶名" }]}>
        {/* <label htmlFor="username">用户名</label> */}
        <Input placeholder={'用户名'} type="text" id={"username"} />
      </Form.Item>
      <Form.Item name={'password'} rules={[{ required: true, message: "请输入密码" }]}>
        {/* <label htmlFor="password">密码</label> */}
        <Input placeholder={'密码'} type="password" id={"password"} />
        {/* <input type="password" id={"password"} /> */}
      </Form.Item>
      <Form.Item name={'cpassword'} rules={[{ required: true, message: "请確認密码" }]}>
        <Input placeholder={'確認密码'} type="password" id={"cpassword"} />
      </Form.Item>
      <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>註冊</LongButton>
    </Form>
  );
};