import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { Refine } from '@refinedev/core';
// Removed kbar for simplicity - can be added later if needed
import routerProvider from '@refinedev/react-router-v6';
import { dataProvider } from './providers/dataProvider';
import { resources } from './config/resources';
import { ThemedLayoutV2 } from '@refinedev/antd';
import { App as AntdApp } from 'antd';
import '@refinedev/antd/dist/reset.css';

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { CompanyList } from './pages/companies/list';
import { CompanyShow } from './pages/companies/show';
import { SearchPage } from './pages/search';
import { DashboardPage } from './pages/dashboard';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider}
            resources={resources}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                }
              >
                <Route index element={<DashboardPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/companies">
                  <Route index element={<CompanyList />} />
                  <Route path=":id" element={<CompanyShow />} />
                </Route>
              </Route>
            </Routes>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
);

