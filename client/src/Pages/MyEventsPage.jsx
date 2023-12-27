import React, {useEffect, useState} from 'react'
import "./Home.css";
import {useLocation} from "react-router-dom";
import Navbar from '../Components/Navbar/Navbar';
import User from '../Components/User/User';
import Spinner from 'react-bootstrap/Spinner';
import Globals from '../../globals';

const MyEventsPage = () => {
    const location = useLocation();
    const userData = location.state && location.state.event;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(userData.email);

    const getData = async () => {
        try {
            const response = await fetch('http://server:8000/api/user/' + userData.email + '/registeredEvents', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Globals.token
                },
            });

            if (!response.ok) {
                throw new Error('Error');
            }

            const d = await response.json();
            setData(d);

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

  return (
    <div className='main_container'>
      <Navbar/>
      {loading ? (
            <div className="loading-container">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden" >Loading...</span>
                    </Spinner>    
                </div>
            ) : (
                <User state={{event: data}}/>
                
        )}
    </div>
  )
}

export default MyEventsPage