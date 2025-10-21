'use client'; // 声明为客户端组件以使用事件处理

import { useCallback } from 'react';

export default function Home() {
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
      } else {
        throw new Error('Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      console.log('添加用户失败');
    }
  }, []);

  // 获取并打印所有用户
  const printAllUsers = useCallback(async () => {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const users = await response.json();
        console.log('All users:', users);
        console.log('用户列表已打印到控制台');
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      console.log('获取用户列表失败');
    }
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>用户管理</h1>
      <button onClick={addRandomUser} style={{ marginRight: '10px' }}>
        随机增加用户
      </button>
      <button onClick={printAllUsers}>
        打印所有用户
      </button>
    </div>
  );
}