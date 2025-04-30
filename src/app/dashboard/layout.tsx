import ProtectedRoute from '@/Components/ProtectedRoute';
import DashboardLayout from '@/Layout/DashboardLayouts'
import React from 'react'

export default function page({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <ProtectedRoute>
                <DashboardLayout>
                    {children}
                </DashboardLayout>
            </ProtectedRoute>
        </>
    )
}
