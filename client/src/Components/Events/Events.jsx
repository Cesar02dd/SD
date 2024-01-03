import React from 'react';
import './Events.css';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import localImage from '../Assets/location.png';
import dataImage from '../Assets/data.png';
import { useEffect, useState } from 'react';
import Globals from '../../../globals';
import EventCount from './EventCount';

const Events = ({state}) => {

    const data = state.event;

    return (
        <div className='eventsRes'>
            {data.map(event => (
                <Card key={event.Id} className='card_container'>
                    <Card.Header className='title_event'>{event.Name} <EventCount state={{count: event.Id}}></EventCount></Card.Header>
                    <Card.Body>
                        <Card.Text className='subtitle'>
                            <Card.Img variant="left" src={localImage} className='images' />
                            {event.Local}
                        </Card.Text>
                        <Card.Text className='subtitle'>
                            <Card.Img variant="left" src={dataImage} className='images' />
                            {event.Date}
                        </Card.Text>
                        <Link to={"/register"} state={{event: event.Id}}>
                            <Button className='search_button' variant="primary">Register</Button>
                        </Link>
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}

export default Events
