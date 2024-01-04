import React from 'react';
import './Events.css';
import { useEffect, useState } from 'react';
import Globals from '../../../globals';

const EventCount = ({state}) => {

    const data = state;
    console.log("Num:  " + data.count);
    const [count, setCount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const responseCount = await fetch('/register/api/event/'+data.count+'/count', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Globals.token,
                    },
                });
                const resultCount = await responseCount.json();
                setCount(resultCount);

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchApi();
    }, []);

    if (loading) return 'Loading...';
    if (error) return `Error: ${error}`;

    return (
        <div className='eventsRes'>
                <p>Total de participantes: {count}</p>
        </div>
    )
}

export default EventCount