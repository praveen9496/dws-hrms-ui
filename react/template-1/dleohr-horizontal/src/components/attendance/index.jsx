import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AttendanceTable = () => {
    const [attendanceData, setAttendanceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'http://dwinhrms-eapi.us-e2.cloudhub.io/api/attendance/totalHours/DW001?Date=27-05-2024',
                    {
                        headers: {
                            'client_id': 'f166fc00447c4c358fd582d79f246f92',
                            'client_secret': '749f3d2b22d74A5f827c4BaB9FCb324F'
                        }
                    }
                );
                setAttendanceData(response.data);
            } catch (error) {
                console.error('Error fetching the data', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {attendanceData && (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>First Checked-in</th>
                            <th>Last Checked-out</th>
                            <th>Total Hours</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{attendanceData.date}</td>
                            <td>{attendanceData.firstCheckedin}</td>
                            <td>{attendanceData.lastCheckedout}</td>
                            <td>{attendanceData.totalHours}</td>
                            <td>{attendanceData.status}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AttendanceTable;
