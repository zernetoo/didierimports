'use client';

import React, { useEffect, useState } from 'react';
import { isAdminAuthenticated } from '@/lib/store-db';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setAuthed(isAdminAuthenticated());
    setChecked(true);
  }, []);

  if (!checked) {
    return (
      <div className="min-h-screen bg-[#020F4A] flex items-center justify-center text-white text-sm font-bold">
        Carregando painel...
      </div>
    );
  }

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  return <AdminDashboard onLogout={() => setAuthed(false)} />;
}
