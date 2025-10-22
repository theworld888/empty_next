'use client'; // 声明为客户端组件以使用事件处理

import { useCallback, useState } from 'react';

interface User {
  id: number;
  name?: string;
  email: string;
  createdAt: string;
}

export default function Home() {
  // 状态管理用户列表
  const [users, setUsers] = useState<User[]>([]);

  // 随机增加用户
  const addRandomUser = useCallback(async () => {
    try {
      const randomName = `User${Math.floor(Math.random() * 1000)}`;
      const randomEmail = `user${Math.floor(Math.random() * 1000)}@example.com`;
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: randomName, email: randomEmail }),
      });
      if (response.ok) {
        console.log('User added:', await response.json());
        console.log('用户添加成功！');
        // 刷新用户列表
        const fetchResponse = await fetch('/api/users');
        if (fetchResponse.ok) {
          setUsers(await fetchResponse.json());
        }
      } else {
        throw new Error('Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      console.log('添加用户失败');
    }
  }, []);

  // 获取并打印所有用户，同时更新表格
  const printAllUsers = useCallback(async () => {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const fetchedUsers = await response.json();
        console.log('All users:', fetchedUsers);
        console.log('用户列表已打印到控制台');
        setUsers(fetchedUsers); // 更新表格数据
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      console.log('获取用户列表失败');
    }
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px' }}>用户管理</h1>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={addRandomUser}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          随机增加用户
        </button>
        <button
          onClick={printAllUsers}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          打印并显示所有用户
        </button>
      </div>
      {users.length > 0 ? (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            border: '1px solid #ddd',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {user.id}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {user.name || '-'}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {user.email}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {new Date(user.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>暂无用户数据，请点击“打印并显示所有用户”按钮加载。</p>
      )}
    </div>
  );
}