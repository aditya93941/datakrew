import { ResourceProps } from '@refinedev/core';

export const resources: ResourceProps[] = [
  {
    name: 'companies',
    list: '/companies',
    show: '/companies/:id',
    meta: {
      label: 'Companies',
      icon: '🏢',
    },
  },
  {
    name: 'search',
    list: '/search',
    meta: {
      label: 'Search',
      icon: '🔍',
    },
  },
];

