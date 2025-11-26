import { Card, Row, Col, Statistic, Typography, Alert } from 'antd';
import { BankOutlined, SearchOutlined, GlobalOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

export const DashboardPage = () => {
  // Check if API key is configured
  const apiKey = import.meta.env.VITE_CLAY_API_KEY;
  const apiKeyConfigured = apiKey && apiKey.trim().length > 0 && apiKey !== 'your_clay_api_key_here';

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Clay Data Dashboard</Title>
      
      {!apiKeyConfigured && (
        <Alert
          message="API Key Not Configured"
          description={
            <Typography.Text>
              Please add your Clay API key to <code>frontend/.env</code> file:
              <br />
              <code>VITE_CLAY_API_KEY=your_actual_api_key</code>
              <br />
              Get your API key from{' '}
              <a href="https://clay.com" target="_blank" rel="noopener noreferrer">
                clay.com
              </a>
            </Typography.Text>
          }
          type="warning"
          showIcon
          icon={<ExclamationCircleOutlined />}
          style={{ marginBottom: '24px' }}
        />
      )}

      {apiKeyConfigured && (
        <Alert
          message="API Key Configured"
          description="Your Clay API key is set. You can now search for companies!"
          type="success"
          showIcon
          icon={<CheckCircleOutlined />}
          style={{ marginBottom: '24px' }}
        />
      )}
      
      <Card style={{ marginBottom: '24px' }}>
        <Typography.Paragraph>
          <strong>Welcome!</strong> Use the Search page to find companies from Clay API.
          Search results will be displayed with company details, and you can view
          individual company information.
        </Typography.Paragraph>
        <Typography.Paragraph>
          <GlobalOutlined /> Search will only execute when you click the "Search" button or press Enter.
        </Typography.Paragraph>
      </Card>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Search Companies"
              value="Ready"
              prefix={<SearchOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Clay API"
              value="Connected"
              prefix={<BankOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Data Source"
              value="Clay API"
              prefix={<GlobalOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

