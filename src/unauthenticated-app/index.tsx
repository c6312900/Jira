import { Button, Card, Divider, Typography } from "antd";
import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import styled from "@emotion/styled";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";
import { useDocumentTitle } from "utils";
import { ErrorBox } from "components/lib";
//import {Helmet} from "react-helmet";

export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    useDocumentTitle('請登入或註冊');

    return (
    <Container>
    {/* return <div style={{display:'flex', justifyContent:'center'}}> */}
    {/* <Helmet>
      <title>請登入或註冊</title>
    </Helmet> */}
     <Header/>
     <Background />
       {/* <Button  onClick={() => {
         throw new Error('點擊拋出異常')
       }}>拋出異常</Button> */}
        <ShadowCard>
          <Title>{isRegister ? "請註冊" : "請登入"}</Title>
          <ErrorBox error={error} />
          {/* {error? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null } */}
          {isRegister?  <RegisterScreen onError={setError}/> : <LoginScreen onError={setError}/>}
          <Divider/>
          <Button type={"link"} onClick={() => setIsRegister(!isRegister)}>
           {isRegister ? "已經有帳號?直接登入" : "沒有帳號?註冊新帳號"}
-         </Button>
           {/* <a href="/#" onClick={() => setIsRegister(!isRegister)}>
           {isRegister? '已經有帳號?直接登入' : '沒有帳號?註冊新帳號' }</a> */}
        </ShadowCard>
        
    </Container> 
)
};

export const LongButton = styled(Button)`
  width: 100%;
`

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`

const Container = styled.div `
display: flex;
flex-direction: column;
align-items: center;
min-height: 100vh;
`