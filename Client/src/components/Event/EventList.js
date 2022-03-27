
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";

const EventList = () => {
const[data, setData]= useState([]);

useEffect(()=> {
    getEvents();
}, []);


const axios = require('axios');

const getEvents = async () => {
    try {
        const resp = await axios.get('http://localhost:5000/event/all');
        setData(resp.data)
        console.log(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

const Delete = async (id) => {
    const response = await axios.get(
        "http://localhost:5000/event/delete/"+id
    ).then(res => {
        setData(event => event.filter((item) => item._id !== id));
        alert(res.data);
    });
};
 
 
console.log("data =>" , data);
return(
    <div className="row" style= {{marginTop: "200px", marginLeft:"200px"}}>
        {data && data.map((item, index)=>{return (
            <Card style={{ width: '25rem' }}>
                <Card.Img variant="top" src={item.avatar} style= {{marginBottom: "5px"}}/>
                <Card.Body style ={{display: "inline-grid"}}>
                    <Card.Title>
                        {item.title} 
                    </Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <button variant="primary" onClick={()=>Delete(item._id)} >Delete</button> 
                    <button variant="primary"><Link to={`/donate/${item._id}`}>Donate</Link></button> 
                    <button variant="primary"> Edit</button>
                </Card.Body>
            </Card>
        )})}

    </div>
);

} ;  

export default EventList;