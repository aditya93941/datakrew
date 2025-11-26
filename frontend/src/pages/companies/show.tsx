import { Show, TextField } from '@refinedev/antd';
import { useShow } from '@refinedev/core';
import { Typography, Descriptions, Tag, Space } from 'antd';
import { BankOutlined, GlobalOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title } = Typography;

export const CompanyShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{record?.name}</Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Name">
          <TextField value={record?.name} />
        </Descriptions.Item>
        <Descriptions.Item label="Domain">
          <Space>
            <GlobalOutlined />
            <a href={`https://${record?.domain}`} target="_blank" rel="noopener noreferrer">
              {record?.domain}
            </a>
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Website">
          {record?.website ? (
            <a href={record.website} target="_blank" rel="noopener noreferrer">
              {record.website}
            </a>
          ) : (
            '-'
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Industry">
          {record?.industry ? <Tag>{record.industry}</Tag> : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="Location">
          <Space>
            <EnvironmentOutlined />
            {record?.location || '-'}
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          <TextField value={record?.description} />
        </Descriptions.Item>
        <Descriptions.Item label="Employee Count">
          {record?.employeeCount ? record.employeeCount.toLocaleString() : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="Revenue">
          {record?.revenue || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="Last Synced">
          {record?.lastSyncedAt ? new Date(record.lastSyncedAt).toLocaleString() : '-'}
        </Descriptions.Item>
      </Descriptions>
    </Show>
  );
};

