import { Button, Drawer } from "antd"
import { useProjectModal } from "./util"

//export const ProjectModal = (props:{projectModalOpen: boolean, onClose:() => void}) => {
export const ProjectModal = () => {
    const {projectModalOpen, close, editingProject, isLoading} = useProjectModal()
    // return <Drawer onClose={props.onClose} visible={props.projectModalOpen} width={'100%'}></Drawer>
    return <Drawer onClose={close} visible={projectModalOpen} width={'100%'}>
        <h1>Project Modal</h1>
        <Button onClick={close}>關閉</Button>
    </Drawer>
}