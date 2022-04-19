import React, { useState, useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import { useParams} from "react-router";
import axios from "axios";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Card from 'react-bootstrap/Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton'; 
///

import { styled } from '@mui/material/styles'; 
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar'; 
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

function Event(props) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [event,setEvent]=useState(null);
    const params =useParams();
    const [donation,setDonation]=useState({title:""});
    const [File, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false); 
    const [refreshData, setRefreshData] = useState(false)
    const filePickerRef = useRef();

    useEffect(()=> {
  
        getEvent();
    }, [refreshData]);

    const pickedHandler = (event) => {
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
          pickedFile = event.target.files[0];
          setFile(pickedFile);
          setIsValid(true);
          fileIsValid = true;
        } else {
          setIsValid(false);
          fileIsValid = false;
        }
      };
    const getEvent = async () => {
        try {
            const resp = await axios.get('http://localhost:5000/event/get/'+params.id);
            setEvent(resp.data)
            console.log(resp.data);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {setOpen(false);
    setRefreshData(!refreshData)}
    const handleOpen = () => setOpen(true);

    const doAddDonation = async (event)=>{
        const form = new FormData();
        form.append('title' , donation["title"] );
        form.append('event',event)
        form.append('image' , File ); 
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
          
        axios.post('http://localhost:5000/donation/new',form).then(res=>{
            
            handleClose()
        })
    }
    const Delete =async (id) =>{
        try {
            const resp = await axios.delete('http://localhost:5000/donation/delete/'+id);
            setEvent({...event,Donations:event.Donations.filter(donation=>donation._id!==id)})
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }
    return (
        <div className="row" style= {{marginTop: "200px", marginLeft:"200px"}}>
            {(event!==null)?
            <div>
                <h3 style={{marginLeft: "20px"}}>Donations</h3> 
                <Button onClick={handleOpen} style={{marginLeft: "242px", marginTop: "-77px"}}>Add more</Button>
   
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add more
          </Typography>
          <br/>
          <TextField id="outlined-basic" 
            value={donation["title"]}
            onChange={(e) => setDonation({ title: e.target.value })} label="Donation Title" variant="outlined" />
        <br />
        <input
          className="form-control"
          type="file"
          accept=".jpg,.png,.jpeg"
          name="image"
          onChange={pickedHandler}
          ref={filePickerRef}
        
        // onChange={(e)=>setEvent({...event,image:e.target.files[0]})}
        />
        <button onClick={()=>{
         
          doAddDonation(params.id)}}>add</button>
          </Box>
      </Modal> 
                <br></br>
                <div className="row">
                    {event.Donations.map(donation => (
                    
                        <Grid  style= {{marginBottom: "40x", marginLeft:"30px"}}>
    <Card sx={{ maxWidth: 345 }}>
       
      <CardMedia
        component="img"
        height="100"
        image={donation.avatar}
        style= {{marginBottom: "5px",marginLeft: "5px", width:"25rem", height:'25rem'}}
        alt="Paella dish"
      />
      <CardContent>
    
        <Typography variant="body2" color="text.secondary">
        {donation.title}
        </Typography>
      </CardContent>
       
    </Card>
            </Grid>
            ///

                    ))}        
                </div> 
            </div>
            :'Event not found!'}   
           
        </div>
    );

}


export default Event;
