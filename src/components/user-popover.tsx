import styled from "@emotion/styled"
import { Divider, List, Popover, Typography } from "antd"
import { useUsers } from "utils/user";

                             
                              //props:{setProjectModalOpen: (isOpen: boolean) => void}
//export const ProjectPopover = (props:{projectButton: JSX.Element}) => {
export const UserPopover = () => {
    const {data: users, refetch} = useUsers();
  
    const content = <ContentContainer>
        <Typography.Text type={"secondary"}>組員列表</Typography.Text>
        <List>
           {users?.map((user) => 
           <List.Item key={user.id}>
               <List.Item.Meta title={user.name}/>
           </List.Item>)}
        </List>
        <Divider/>
        {/* <ButtonNoPadding 
        //    onClick={() => props.setProjectModalOpen(true)}
           onClick={open} 
           type={"link"}>
              創建項目
        </ButtonNoPadding> */}
        {/* {props.projectButton} */}
    </ContentContainer>
    return <Popover onVisibleChange={() => refetch()} placement={"bottom"} content={content}>
        <span>
         組員
        </span>
    </Popover>
}

const ContentContainer = styled.div`
    min-width: 30rem;
`