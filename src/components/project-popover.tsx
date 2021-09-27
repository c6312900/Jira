import styled from "@emotion/styled"
import {List, Popover, Typography } from "antd"
import { useProject } from "utils/project"

export const ProjectPopover = () => {
    const {data: projects} = useProject();
    const pinnedProjects = projects?.filter((project) => project.pin)
    const content = <ContentContainer>
        <Typography.Text type={"secondary"}>收藏項目</Typography.Text>
        <List>
           {pinnedProjects?.map(project => <List.Item>
               <List.Item.Meta title={project.name}/>
           </List.Item>) }
        </List>
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