'use client';

import { useState, type ChangeEvent } from 'react';
import { Button, Input, Space } from 'antd';
import api from '@/src/lib/api';

export default function AccessSearch({
  onResult,
}: {
  onResult: (data: any) => void;
}) {
  const [query, setQuery] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const search = async () => {
    try {
      setLoading(true);

      const res = await api.get('/access/search', {
        params: { dni: query, fullName: query },
      });

      onResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Input
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        placeholder="Buscar por DNI o nombre"
        allowClear
      />
      <Button type="primary" onClick={search} loading={loading} block>
        {loading ? 'Buscando...' : 'Buscar'}
      </Button>
    </Space>
  );
}