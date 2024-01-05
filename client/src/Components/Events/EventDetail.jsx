import React from 'react';
import './Events.css';
import Card from 'react-bootstrap/Card';
import avatar from './../../../public/Avatar-1.svg'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

const EventDetail = ({ state }) => {

    const dataUsers = state.paid;

    return (
        <div className='container'>
            {dataUsers.map(paid => (
                <Card key={paid.id} className='card_users'>
                        <Row>
                            <Col className='avatar-col'>
                                <Card.Img className='user-avatar' src={avatar}></Card.Img>
                            </Col>
                            <Col className='user-col'>
                                <Card.Text>
                                    <p>Name: {paid.name}</p>
                                </Card.Text>
                                <Card.Text>
                                    <p>E-mail: {paid.email}</p>
                                </Card.Text>
                                <Card.Text>
                                    <p>Data de registo: {paid.registered_date}</p>
                                </Card.Text>
                                <Card.Text>
                                    <p>ID de pagamento: {paid.payment_id}</p>
                                </Card.Text>
                            </Col>
                        </Row>
                </Card>
            ))}
        </div>
    )
}

export default EventDetail