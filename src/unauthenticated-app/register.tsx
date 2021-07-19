import { useAuth } from "context/auth-context";
import { Button, Form, Input } from "antd";


export const RegisterScreen = () => {
  const {register} = useAuth();
 
  const handleSubmit = (values: { username: string; password: string }) => {
    register(values);
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
      <Button htmlType={"submit"} type={"primary"}>註冊</Button>
    </Form>
  );
};