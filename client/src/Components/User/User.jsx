import React from 'react';
import Card from 'react-bootstrap/Card';
import './User.css';
import localImage from '../Assets/location.png';
import dataImage from '../Assets/data.png';

const User = ({state}) => {
  const data = state.event;
  console.log(data);
  return (
    <div className='eventsResult'>
      {data.map((event, index) => (
                <Card key={index} className='card_container'>
                    <Card.Header className='title_event'>Id no serviço de eventos: {event.IdEvents}</Card.Header>
                    <Card.Body>
                        <Card.Text className='subtitle'>
                            <Card.Img variant="left" src={localImage} className='images' />
                            Id no serviço de pagamentos: {event.payment_id}
                        </Card.Text>
                        <Card.Text className='subtitle'>
                            <Card.Img variant="left" src={dataImage} className='images' />
                            Data de registo: {event.registered_date}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
    </div>
  )
}

export default User
