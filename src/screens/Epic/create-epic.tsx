import styled from "@emotion/styled"
import { Button, Drawer, DrawerProps, Form, Input, Spin } from "antd"
import { useForm } from "antd/lib/form/Form"
import { ErrorBox } from "components/lib"
import { useEffect } from "react"
import { useProjectIdInUrl } from "screens/kanban/util"
import { useAddEpic } from "utils/epic"
import { useEpicsQueryKey } from "./util"

export const CreateEpic = (props: Pick<DrawerProps,'visible'> & {onClose: () => void}) => {
    const {mutate: addEpic, isLoading, error} = useAddEpic(useEpicsQueryKey())
    const  [form] = useForm()
    const projectId = useProjectIdInUrl()
    const onFinish = async (values:any) => {
       await addEpic({...values,projectId})
       props.onClose()
    }

    useEffect(() => {
        form.resetFields()
    },[form,props.visible])

    return <Drawer visible={props.visible} 
                   onClose={props.onClose} 
                   forceRender={true} 
                   destroyOnClose={true} 
                   width={'100%'}>
       <Container>
       {
            isLoading? <Spin size={"large"} /> : <>
            <h1>創建任務組</h1>
            <ErrorBox error={error}/>
            <Form form={form} layout={'vertical'} style={{width:'40rem'}} onFinish={onFinish}>
               <Form.Item label={'名稱'} name={'name'} rules={[{required: true, message: '請輸入任務組名稱'}]} >
                    <Input placeholder={'請輸入任務組名稱'}/>   
               </Form.Item>
               <Form.Item style={{textAlign: "right"}}>
                    <Button loading={isLoading} type={'primary'} htmlType={'submit'} >
                      提交
                    </Button>
               </Form.Item>                
            </Form>
            </>
        }
       </Container>
    </Drawer>
}

const Container = styled.div`
 height: 80vh;
 display: flex;
 flex-direction: column;
 jstify-ontent: center;
 align-items: center;
`