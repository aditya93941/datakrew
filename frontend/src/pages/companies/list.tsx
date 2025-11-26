import { List, useTable, ShowButton } from '@refinedev/antd';
import { Table, Tag, Card, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Paragraph } = Typography;

interface Company {
  id: string;
  name: string;
  domain?: string;
  industry?: string;
  location?: string;
  employeeCount?: number;
  revenue?: string;
}

export const CompanyList = () => {
  // Disable auto-fetching - companies should be searched via Search page
  const { tableProps } = useTable<Company>({
    resource: 'companies',
    pagination: {
      pageSize: 20,
    },
    queryOptions: {
      enabled: false, // Don't auto-fetch - prevents CORS errors
    },
    meta: {
      query: '', // Empty query shows no results - users should use Search page
    },
  });

  const columns: ColumnsType<Company> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Domain',
      dataIndex: 'domain',
      key: 'domain',
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      key: 'industry',
      render: (industry) => industry ? <Tag>{industry}</Tag> : '-',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Employees',
      dataIndex: 'employeeCount',
      key: 'employeeCount',
      render: (count) => count ? count.toLocaleString() : '-',
      sorter: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <ShowButton hideText size="small" recordItemId={record.id} />
      ),
    },
  ];

  return (
    <List>
      {tableProps.dataSource && tableProps.dataSource.length > 0 ? (
        <Table {...tableProps} columns={columns} rowKey="id" />
      ) : (
        <Card>
          <Paragraph>
            No companies to display. Use the <strong>Search</strong> page to find companies from Clay API.
          </Paragraph>
        </Card>
      )}
    </List>
  );
};

