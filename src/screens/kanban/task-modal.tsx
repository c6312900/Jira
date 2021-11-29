import { Form, Input, Modal } from "antd"
import { useForm } from "antd/lib/form/Form"
import { TaskTypeSelect } from "components/task-type-select"
import { UserSelect } from "components/user-select"
import { useEffect } from "react"
import { useEditTask } from "utils/task"
import { useTasksModal, useTasksQueryKey } from "./util"

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span:16}
}
export const TaskModal = () => {
    const [form] = useForm()
    const {editingTaskId,editingTask,close} = useTasksModal() //從url抓取資料
    const {mutateAsync: editTask,isLoading: editLoading }= useEditTask(useTasksQueryKey())
    const onCancel = () => {
      close()
      form.resetFields()
    }
    
    // 編輯的資料寫入後端server
    const onOk = async () => {
       await editTask({...editingTask, ...form.getFieldsValue()})
       close()
    }
    
    //當url有變或form的資料有變,要重新改變form的setFieldsValue
    useEffect(() => {
       form.setFieldsValue(editingTask)
    },[form, editingTask])

    return <Modal forceRender={true} onCancel={onCancel} onOk={onOk} okText={'確認'} cancelText={'取消'} confirmLoading={editLoading} title={'編輯任務'} visible={!!editingTaskId}>
       <Form {...layout} initialValues={editingTask} form={form}>
           <Form.Item label={'任務名'} name={'name'} rules={[{required: true, message:'請輸入任務名' }]}>
             <Input/>
           </Form.Item>
           <Form.Item label={'經辦人'} name={'processorId'}>
             <UserSelect defaultOptionName={'經辦人'}/> 
           </Form.Item>
           <Form.Item label={'類型'} name={'typeId'} rules={[{required: true, message:'請輸入任務名' }]}>
              <TaskTypeSelect/>
           </Form.Item>
       </Form>
    </Modal>

}

