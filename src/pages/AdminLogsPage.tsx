import { useGetAdminLogsQuery } from '../store/api/trackerApi';
import { Table, Badge, Spinner as BSpinner } from 'react-bootstrap';
import Avatar from "../components/ui/Avatar.tsx";

export const AdminLogsPage = () => {
    const { data: logs, isLoading, isFetching, refetch } = useGetAdminLogsQuery(undefined, {
        pollingInterval: 30000,
    });

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-50 mt-5">
                <BSpinner animation="border" variant="primary" />
            </div>
        );
    }

    const formatLogDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4 p-4 bg-light rounded-3 border">
                <div>
                    <h1 className="h3 fw-bold text-primary m-0">Activity Logs</h1>
                </div>

                <Badge
                    bg="white"
                    className="px-3 py-2 rounded-pill d-flex align-items-center gap-2 user-select-none border text-dark shadow-sm"
                    onClick={() => refetch()}
                    style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                    title="Click to reload now"
                >
                    {isFetching ? (
                        <BSpinner animation="border" size="sm" variant="dark" className="m-0" />
                    ) : (
                        <span className="bg-success rounded-circle d-inline-block" style={{ width: '8px', height: '8px' }} />
                    )}
                    <span className="fw-semibold text-dark">Last 100 Actions</span>
                </Badge>
            </div>

            <div className="bg-white rounded-3 shadow-sm border overflow-hidden">
                <Table hover responsive className="mb-0 align-middle">
                    <thead className="table-light border-bottom">
                    <tr>
                        <th className="ps-4 py-3 text-uppercase tracking-wider text-muted small fw-bold" style={{ fontSize: '0.75rem' }}>User</th>
                        <th className="py-3 text-uppercase tracking-wider text-muted small fw-bold" style={{ fontSize: '0.75rem' }}>Action</th>
                        <th className="py-3 text-uppercase tracking-wider text-muted small fw-bold" style={{ fontSize: '0.75rem' }}>Type</th>
                        <th className="py-3 text-uppercase tracking-wider text-muted small fw-bold" style={{ fontSize: '0.75rem' }}>New Value</th>
                        <th className="py-3 text-uppercase tracking-wider text-muted small fw-bold" style={{ fontSize: '0.75rem' }}>Location (URL)</th>
                        <th className="pe-4 py-3 text-uppercase tracking-wider text-muted small fw-bold" style={{ fontSize: '0.75rem' }}>Timestamp</th>
                    </tr>
                    </thead>
                    <tbody className="border-0">
                    {logs?.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center py-5 text-muted fst-italic">
                                No administrative logs found.
                            </td>
                        </tr>
                    ) : (
                        logs?.map((log) => (
                            <tr key={log.id} style={{ borderBottom: '1px solid #f2f2f2' }}>
                                <td className="ps-4 font-monospace small text-dark fw-medium">
                                    {log.user?.firstName ? (<div className="d-flex align-items-center gap-2 text-dark fw-bold">
                                        <Avatar src={log.user.image} size="small-avatar"/>
                                        <div>{log.user.firstName} {log.user.lastName}</div>
                                    </div>) : ( <div className="d-flex align-items-center gap-2 text-muted fw-bold"><Avatar size="small-avatar"/>Guest</div>)}
                                </td>
                                <td>
                                    <Badge bg={log.action === 'CLICK' ? 'primary' : 'info'} text="dark" className="px-2 py-1 font-monospace">
                                        {log.action}
                                    </Badge>
                                </td>
                                <td className="text-capitalize text-dark small">{log.componentType || '—'}</td>
                                <td className="text-truncate small text-dark" style={{ maxWidth: '170px' }}>
                                    {log.newValue ? (
                                        <code className="text-danger-emphasis bg-light px-1 py-0.5 rounded">{log.newValue}</code>
                                    ) : (
                                        <span className="text-muted fst-italic">none</span>
                                    )}
                                </td>
                                <td className="small text-muted text-truncate" style={{ maxWidth: '220px' }}>
                                        <span className="font-monospace bg-light text-secondary px-2 py-1 rounded small border-sm">
                                            {log.url ? new URL(log.url).pathname : '/'}
                                        </span>
                                </td>
                                <td className="pe-4 small text-nowrap text-muted font-monospace">
                                    {formatLogDate(log.createdAt)}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};
