interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status: 'active' | 'inactive' | 'pending';
    lastLogin: string;
    joinDate: string;
  }
  
  export const users: User[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2023-06-15T09:30:00',
      joinDate: '2022-01-10',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      role: 'Editor',
      status: 'active',
      lastLogin: '2023-06-14T14:45:00',
      joinDate: '2022-03-15',
    },
    {
      id: 3,
      firstName: 'Robert',
      lastName: 'Johnson',
      email: 'robert.j@example.com',
      role: 'Viewer',
      status: 'inactive',
      lastLogin: '2023-05-20T11:20:00',
      joinDate: '2022-05-22',
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.d@example.com',
      role: 'Editor',
      status: 'pending',
      lastLogin: '2023-06-10T16:30:00',
      joinDate: '2023-01-05',
    },
    {
      id: 5,
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.b@example.com',
      role: 'Viewer',
      status: 'active',
      lastLogin: '2023-06-15T08:15:00',
      joinDate: '2023-02-18',
    },
    {
      id: 6,
      firstName: 'Sarah',
      lastName: 'Wilson',
      email: 'sarah.w@example.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2023-06-14T10:00:00',
      joinDate: '2021-11-30',
    },
    {
      id: 7,
      firstName: 'David',
      lastName: 'Taylor',
      email: 'david.t@example.com',
      role: 'Editor',
      status: 'inactive',
      lastLogin: '2023-04-05T13:25:00',
      joinDate: '2022-08-12',
    },
    {
      id: 8,
      firstName: 'Jessica',
      lastName: 'Anderson',
      email: 'jessica.a@example.com',
      role: 'Viewer',
      status: 'pending',
      lastLogin: '2023-06-12T09:45:00',
      joinDate: '2023-03-22',
    },
    {
      id: 9,
      firstName: 'Thomas',
      lastName: 'Martinez',
      email: 'thomas.m@example.com',
      role: 'Editor',
      status: 'active',
      lastLogin: '2023-06-13T15:10:00',
      joinDate: '2022-09-05',
    },
    {
      id: 10,
      firstName: 'Lisa',
      lastName: 'Garcia',
      email: 'lisa.g@example.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2023-06-15T07:30:00',
      joinDate: '2021-10-15',
    },
  ];