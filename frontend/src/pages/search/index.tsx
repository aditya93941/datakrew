import { useState } from 'react';
import { Card, Input, Button, Table, Space, Typography, Tag, Alert, Spin } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';

const { Title } = Typography;

interface Company {
  id: string;
  name: string;
  domain?: string;
  industry?: string;
  location?: string;
  employeeCount?: number;
  revenue?: string;
  website?: string;
}

// Backend API Configuration
// Frontend calls our backend, which then calls Clay webhook
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'https://datakrew.onrender.com';

const axiosInstance = axios.create({
  baseURL: BACKEND_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<{
    companies: Company[];
    total: number;
    searchTerm: string;
    cached: boolean;
  } | null>(null);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      // Call our backend search endpoint
      // Backend will handle Clay webhook integration
      console.log('Calling backend search API:', {
        url: `${BACKEND_API_URL}/api/search`,
        query: searchQuery,
      });

      const response = await axiosInstance.get('/api/search', {
        params: {
          q: searchQuery,
        },
      });

      // Backend returns: { query, results: [...], total, ... }
      const results = response.data.results || [];
      
      setSearchResults({
        companies: results,
        total: response.data.total || results.length,
        searchTerm: response.data.query || searchQuery,
        cached: response.data.cached || false,
      });
    } catch (err: any) {
      setIsError(true);
      if (err.code === 'ERR_NETWORK' || err.message?.includes('CORS') || err.message?.includes('Access-Control')) {
        setError('Network Error: Cannot connect to backend server. Make sure the backend is running on port 3000.');
      } else if (err.response) {
        const status = err.response.status;
        const statusText = err.response.statusText;
        const responseData = err.response.data;
        
        let errorMessage = `API Error: ${status} ${statusText}`;
        
        if (status === 404) {
          errorMessage = `404 Not Found: The endpoint doesn't exist. ` +
            `Please check Clay API documentation for the correct endpoint. ` +
            `Tried: ${CLAY_API_URL}/v1/search. ` +
            `You may need to update the endpoint in the code.`;
        } else if (responseData?.message) {
          errorMessage = responseData.message;
        } else if (responseData?.error) {
          errorMessage = responseData.error;
        }
        
        console.error('Clay API Error:', {
          status,
          statusText,
          data: responseData,
          url: err.config?.url,
          method: err.config?.method,
        });
        
        setError(errorMessage);
      } else if (err.request) {
        setError('No response from Clay API. Please check your internet connection and API URL.');
      } else {
        setError(err.message || 'Failed to search companies');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const trimmedQuery = searchTerm.trim();
      setQuery(trimmedQuery);
      performSearch(trimmedQuery);
    }
  };

  const handleRefresh = () => {
    if (query) {
      performSearch(query);
    }
  };

  const columns: ColumnsType<Company> = [
    {
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <a href={record.website || `https://${record.domain}`} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
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
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
    },
  ];


  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Search Companies</Title>
      
      <Card style={{ marginBottom: '24px' }}>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            size="large"
            placeholder="Enter search term (e.g., EV companies in India)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onPressEnter={handleSearch}
            style={{ flex: 1 }}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            size="large"
            onClick={handleSearch}
            loading={isLoading}
          >
            Search
          </Button>
          {query && (
            <Button
              icon={<ReloadOutlined />}
              size="large"
              onClick={handleRefresh}
              loading={isLoading}
            >
              Refresh
            </Button>
          )}
        </Space.Compact>
      </Card>

      {isError && (
        <Alert
          message="Error fetching data"
          description={
            error || 
            'Failed to fetch companies from Clay API. Please check your API key and try again.'
          }
          type="error"
          showIcon
          style={{ marginBottom: '16px' }}
          closable
        />
      )}

      {searchResults && !isError && (
        <Alert
          message="Results from Clay API"
          description={`Found ${searchResults.total} companies`}
          type="success"
          showIcon
          style={{ marginBottom: '16px' }}
        />
      )}

      {isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      )}

      {searchResults && !isLoading && (
        <Card>
          <Table
            columns={columns}
            dataSource={searchResults.companies}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} companies`,
            }}
          />
        </Card>
      )}

      {!query && !isLoading && (
        <Card>
          <div style={{ textAlign: 'center', padding: '50px', color: '#999' }}>
            Enter a search term to find companies
          </div>
        </Card>
      )}
    </div>
  );
};

