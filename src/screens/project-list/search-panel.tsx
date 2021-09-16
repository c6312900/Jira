import { Form, Input } from "antd";
import { Project } from "./list";
import { UserSelect } from "components/user-select";
// import { useEffect, useState } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project,'name' | 'personId'>>
  // param: {
  //   name: string;
  //   personId: number;
    
  // };
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        {/*setParam(Object.assign({}, param, {name:evt.target.value}))*/}
        <Input
          placeholder={"項目名"}
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
        </Form.Item>
        <Form.Item>
          <UserSelect 
           defaultOptionName ={'負責人'}
           value={param.personId} onChange= {(value) =>
            setParam({
              ...param,
              personId: value,
            })}/>
        {/* <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        > */}
        {/* <select
          value={param.personId}
          onChange={(evt) =>
            setParam({
              ...param,
              personId: evt.target.value,
            })
          }
        > */}
          {/* <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select> */}
        </Form.Item>     
    </Form>
  );
};