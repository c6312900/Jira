import styled from "@emotion/styled"
import { Divider, List, Popover, Typography } from "antd"
import { useProject } from "utils/project"
//import { ButtonNoPadding } from "./lib";
                             
                              //props:{setProjectModalOpen: (isOpen: boolean) => void}
export const ProjectPopover = (props:{projectButton: JSX.Element}) => {
    const {data: projects} = useProject();
    const pinnedProjects = projects?.filter((project) => project.pin)
    const content = <ContentContainer>
        <Typography.Text type={"secondary"}>收藏項目</Typography.Text>
        <List>
           {pinnedProjects?.map(project => <List.Item>
               <List.Item.Meta title={project.name}/>
           </List.Item>) }
        </List>
        <Divider/>
        {/* <ButtonNoPadding 
           onClick={() => props.setProjectModalOpen(true)} 
           type={"link"}>
              創建項目
        </ButtonNoPadding> */}
        {props.projectButton}
    </ContentContainer>
    return <Popover placement={"bottom"} content={content}>
        <span>
         項目
        </span>
    </Popover>
}

const ContentContainer = styled.div`
    min-width: 30rem;
`