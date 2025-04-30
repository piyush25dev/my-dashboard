interface Report {
    id: number;
    title: string;
    category: string;
    views: number;
    downloads: number;
    status: 'published' | 'draft' | 'archived';
    createdDate: string;
    lastUpdated: string;
  }
  
  export const reports: Report[] = [
    {
      id: 1,
      title: 'Monthly Sales Performance',
      category: 'Sales',
      views: 1245,
      downloads: 342,
      status: 'published',
      createdDate: '2023-05-15',
      lastUpdated: '2023-06-10',
    },
    {
      id: 2,
      title: 'Customer Acquisition Cost',
      category: 'Marketing',
      views: 892,
      downloads: 156,
      status: 'published',
      createdDate: '2023-04-22',
      lastUpdated: '2023-05-18',
    },
    {
      id: 3,
      title: 'Inventory Levels Q2',
      category: 'Operations',
      views: 567,
      downloads: 89,
      status: 'draft',
      createdDate: '2023-06-05',
      lastUpdated: '2023-06-12',
    },
    {
      id: 4,
      title: 'Employee Satisfaction Survey',
      category: 'HR',
      views: 432,
      downloads: 76,
      status: 'published',
      createdDate: '2023-03-10',
      lastUpdated: '2023-04-05',
    },
    {
      id: 5,
      title: 'Website Traffic Analysis',
      category: 'Marketing',
      views: 1023,
      downloads: 231,
      status: 'published',
      createdDate: '2023-05-01',
      lastUpdated: '2023-05-30',
    },
    {
      id: 6,
      title: 'Annual Financial Forecast',
      category: 'Finance',
      views: 765,
      downloads: 198,
      status: 'archived',
      createdDate: '2022-12-15',
      lastUpdated: '2023-01-20',
    },
  ];