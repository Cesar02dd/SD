import React, {useEffect, useState} from 'react'
import Events from '../Components/Events/Events';
import Navbar from '../Components/Navbar/Navbar';
import "./Home.css";
import Spinner from 'react-bootstrap/Spinner';
import {useLocation} from "react-router-dom";

const SearchPage = () => {

    const location = useLocation();
    const formData = location.state && location.state.event;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        try {
            const response = await fetch('/register/api/filter?name=' + formData.name + '&date=' + formData.date + '&place=' + formData.place, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
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
            <Navbar />
            {loading ? (
                <div className="loading-container">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden" >Loading...</span>
                    </Spinner>    
                </div>
            ) : (
                <div className="test">
                    <Events state={{event: data}} />
                </div>
                
            )}
        </div>
      )
}

export default SearchPage