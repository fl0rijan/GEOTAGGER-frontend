import { useGetAdminLogsQuery } from '../store/api/trackerApi';
import { Table, Container, Badge, Spinner as BSpinner } from 'react-bootstrap';
import { format } from 'date-fns';

export const AdminLogsPage = () => {
    const { data: logs, isLoading, refetch } = useGetAdminLogsQuery();

    if (isLoading) return <div className="text-center mt-5"><BSpinner animation="border" /></div>;

    return (
        <Container className="py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-black text-secondary">Admin Activity Logs</h1>
                <Badge bg="secondary" className="px-3 py-2 rounded-pill">
                    Last 100 Actions
                </Badge>
            </div>

            <div className="bg-white rounded-4xl shadow-sm border overflow-hidden">
                <Table hover responsive className="mb-0">
                    <thead className="bg-light">
                    <tr>
                        <th className="ps-4">User</th>
                        <th>Action</th>
                        <th>Type</th>
                        <th>New Value</th>
                        <th>Location (URL)</th>
                        <th className="pe-4">Timestamp</th>
                    </tr>
                    </thead>
                    <tbody>
                    {logs?.map((log) => (
                        <tr key={log.id}>
                            <td className="ps-4 font-monospace small">
                                {log.user?.username || <span className="text-muted">Guest</span>}
                            </td>
                            <td>
                                <Badge bg={log.action === 'CLICK' ? 'primary' : 'info'} text="dark">
                                    {log.action}
                                </Badge>
                            </td>
                            <td className="text-capitalize">{log.componentType || '—'}</td>
                            <td className="text-truncate" style={{ maxWidth: '150px' }}>
                                {log.newValue || <span className="text-muted italic">none</span>}
                            </td>
                            <td className="small text-muted">
                                {new URL(log.url).pathname}
                            </td>
                            <td className="pe-4 small text-nowrap">
                                {format(new Date(log.createdAt), 'HH:mm:ss dd.MM')}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>

            <p className="text-center text-muted mt-4 small cursor-pointer" onClick={() => refetch()}>
                Click here to refresh manually
            </p>
        </Container>
    );
};