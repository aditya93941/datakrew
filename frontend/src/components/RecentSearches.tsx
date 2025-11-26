import { useList } from '@refinedev/core';
import { List, Tag, Typography, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Text } = Typography;

export const RecentSearches = () => {
  // In a real app, you'd fetch recent searches from a separate endpoint
  // For now, we'll show a placeholder
  const recentSearches = [
    { term: 'EV companies in India', count: 15 },
    { term: 'SaaS startups', count: 42 },
    { term: 'Fintech companies', count: 28 },
  ];

  return (
    <List
      dataSource={recentSearches}
      renderItem={(item) => (
        <List.Item>
          <Space>
            <SearchOutlined />
            <Text>{item.term}</Text>
            <Tag>{item.count} results</Tag>
          </Space>
        </List.Item>
      )}
    />
  );
};

