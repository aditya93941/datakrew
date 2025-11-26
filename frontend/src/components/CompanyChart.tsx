import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CompanyChartProps {
  data: Record<string, number>;
}

export const CompanyChart = ({ data }: CompanyChartProps) => {
  const chartData = Object.entries(data)
    .map(([name, value]) => ({ name, companies: value }))
    .sort((a, b) => b.companies - a.companies)
    .slice(0, 10); // Top 10 industries

  if (chartData.length === 0) {
    return <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>No data available</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="name" 
          angle={-45}
          textAnchor="end"
          height={100}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="companies" fill="#1890ff" />
      </BarChart>
    </ResponsiveContainer>
  );
};

