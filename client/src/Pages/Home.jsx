import Forms from '../Components/Form/Forms'
import Navbar from '../Components/Navbar/Navbar';
import Events  from '../Components/Events/Events';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./Home.css";
import {useEffect, useState} from "react";
import Spinner from 'react-bootstrap/Spinner';

export default function Home (){

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        try {
            const response = await fetch('/event/events', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error');
            }

            //const data = await response.json();
            //setData(data);
            const data1 = await response.text();
            console.log('Server Toni: ' + data1);

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return(
        <>
            <div className='main_container'>
                <Navbar/>
                <Row className='main-row'>
                    <Col xs={{ order: 'first' }}><Forms /></Col>
                    {loading ? (
                        <div className="loading-container">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden" >Loading...</span>
                            </Spinner>
                        </div>
                    ) : (
                        <Col xs={{ order: 'last' }}><Events state={{event: data}} /></Col>
                    )}
                </Row>
            </div>
        </>
    )
}