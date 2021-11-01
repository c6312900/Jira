import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.marginBottom + "rem"};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

const FullPage = styled.div`
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`
export const FullPageLoading = () => <FullPage>
  <Spin size={"large"}></Spin>
</FullPage>

export const FullyPageErrorFallBack = ({error}:{error: Error | null}) => <FullPage>
 <DevTools />
{/* <Typography.Text type={'danger'}>{error?.message}</Typography.Text> */}
<ErrorBox error = {error} />
</FullPage>

//此種方式可在undefine使用,不可在unknown上使用
//export const ErrorBox = ({error} : {error?: {message: string} }) => {  
 // if (error?.message) {

//另一種方式類型守衛, 當value?.message為true時 value is Error類型
const isError = (value: any): value is Error => value?.message

export const ErrorBox = ({error} : {error: unknown}) => {
   if (isError(error)) {
     return <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
   }
   return null
}

export const ButtonNoPadding =  styled(Button)`
 padding: 0 ;
`