import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import EventDetail from '../Components/Events/EventDetail';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Home.css";
import Globals from '../../globals';
import { useParams } from 'react-router-dom';

const EventPage = () => {

    let pageId  = useParams();

    const [events, setEvents] = useState(null);
    const [count, setCount] = useState(null);
    const [paid, setPaid] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApis = async () => {
            try {
                const responseEvents = await fetch('/event/events', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const resultEvents = await responseEvents.json();
                setEvents(resultEvents);

                const responseCount = await fetch('/register/api/event/'+pageId.event+'/count', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Globals.token,
                    },
                });
                const resultCount = await responseCount.json();
                setCount(resultCount);

                const responsePaid = await fetch('/register/api/event/'+pageId.event+'/paidUsers', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Globals.token,
                    },
                });
                const resultPaid = await responsePaid.json();
                setPaid(resultPaid);

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchApis();
    }, []);

    if (loading) return 'Loading...';
    if (error) return `Error: ${error}`;

    return (
        <>
            <div className='main_container'>
                <Navbar />
                <Row className='main-row'>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <><Col className='titleCol'><>{events && events.map(event => event.Id == pageId.event ? (<h2 key={event.Id}>{event.Name}</h2>):null)}</>
                        <h2>Número total de participantes: {JSON.stringify(count, null, 2)}</h2>
                        <EventDetail state={{ paid: paid }} /></Col></>
                    )}
            </Row>
        </div >
        </>
    );
};

export default EventPage;
