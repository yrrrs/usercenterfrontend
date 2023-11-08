import React, {useRef} from 'react';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable, {TableDropdown} from '@ant-design/pro-table';
import {searchUsers} from "@/services/ant-design-pro/api";

const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,
    tip: '标题过长会自动收缩',
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
    copyable: true,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',

    render: (_,record)=>(
      <div>
        <img src={record.avatarUrl} width={75}/>
      </div>
    ),
    copyable: true,
  },
  {
    title: '性别',
    dataIndex: 'gender',
  },
  {
    title: '电话',
    dataIndex: 'phone',
    copyable: true,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    copyable: true,
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    valueType: 'select',
    valueEnum: {
      0: { text: '正常', status: 'Success' },
      1: {
        text: '封禁中',
        status: 'Error',
      },
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
    valueEnum: {
      0: { text: '普通用户', status: 'Default' },
      1: {
        text: '管理员',
        status: 'Success',
      },
    },
  },
//   {
//     disable: true,
//     title: '状态',
//     dataIndex: 'state',
//     filters: true,
//     onFilter: true,
//     valueType: 'select',
//     valueEnum: {
//       all: { text: '全部', status: 'Default' },
//       open: {
//         text: '未解决',
//         status: 'Error',
//       },
//       closed: {
//         text: '已解决',
//         status: 'Success',
//         disabled: true,
//     },
// processing: {
//   text: '解决中',
//       status: 'Processing',
// },
// },
// },
// {
//   disable: true,
//       title: '标签',
//     dataIndex: 'labels',
//     search: false,
//     renderFormItem: (_, { defaultRender }) => {
//   return defaultRender(_);
// },
//     render: (_, record) => (
//     <Space>
//       {record.labels.map(({ name, color }) => (
//           <Tag color={color} key={name}>
//             {name}
//           </Tag>
//       ))}
//     </Space>
// ),
// },

{
  title: '操作',
      valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
  <a
      key="editable"
      onClick={() => {
        action?.startEditable?.(record.id);
      }}
  >
    编辑
  </a>,
  <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
    查看
  </a>,

  <TableDropdown
      key="actionGroup"
      onSelect={() => action?.reload()}
      menus={[
        { key: 'copy', name: '复制' },
        { key: 'delete', name: '删除' },
      ]}
  />,
],
},
];
export default () => {
  const actionRef = useRef<ActionType>();
  return (
      <ProTable<API.CurrentUser>
          columns={columns}
          actionRef={actionRef}
          cardBordered
          request={async (params = {}, sort, filter) => {
            console.log(sort, filter);
            const userList = await searchUsers();
            return{
              data: userList
            }

            // request<{
            //   data: CurrentUser[];
            // }>('https://proapi.azurewebsites.net/github/issues', {
            //   params,
            // });
          }}
          editable={{
            type: 'multiple',
          }}
          columnsState={{
            persistenceKey: 'pro-table-singe-demos',
            persistenceType: 'localStorage',
            onChange(value) {
              console.log('value: ', value);
            },
          }}
          rowKey="id"
          search={{
            labelWidth: 'auto',
          }}
          form={{
            // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
            syncToUrl: (values, type) => {
              if (type === 'get') {
                return {
                  ...values,
                  created_at: [values.startTime, values.endTime],
                };
              }
              return values;
            },
          }}
          pagination={{
            pageSize: 5,
          }}
          dateFormatter="string"
          headerTitle="高级表格"
      />
  );
}
