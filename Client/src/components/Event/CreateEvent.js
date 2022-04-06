 
import { Form, Col, Container } from 'react-bootstrap';
import React, { useState, useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
///////////////////////////////////////////////design button API externe
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, blue 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});
////
function CreateEvent() {
  
  const classes = useStyles();
  
  
  const [event,setEvent]=useState({title:"",description:"",location:"",Startdate:null,Enddate:null});
  const [File, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false); 

  const filePickerRef = useRef();

  ///////////
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
  ///////////
  useEffect(() => {
    if (!File) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(File);
  }, [File]);

  const HandleSubmit = async () => {
    if((event.title==="") || (event.description==="")) {
      return alert("invalid Form!");
    }

    const form = new FormData();
    form.append('title' , event.title );
    form.append('description' , event.description );
    
    form.append('location' , event.description );
    form.append('Startdate' , event.Startdate );
    form.append('Enddate' , event.Enddate );
    form.append('image' , File ); 
    console.log(form);
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  const idUser=JSON.parse(localStorage.getItem('user'))._id

    const response = await axios.post(`http://localhost:5000/event/new?idUser=${idUser}`, form, config)
      .then(res =>{
        
           console.log(res)
          alert("done")
      })
      .catch(error => {
          console.error('There was an error!', error);
      });
    
  }



  return (

    <div className="register-form">
       
     

 
       <h2>Create Event</h2>

      <div> 
      <label>Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="title"
            minlength="4" maxlength="10"
            onChange={(e) =>
                        setEvent({ ...event, title: e.target.value })
                    }
            required
          />
        <div className="form-group">

        <div>
        
      <label>Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="description"
            minlength="10"
            onChange={(e) =>
                        setEvent({ ...event, description: e.target.value })
                    }
            required
          />
           <span className="resultat"></span>
        </div>
        <div className="form-group">
        
      <label>Location</label>
          <input
            type="text"
            className="form-control"
            placeholder="location"
            onChange={(e) =>
                        setEvent({ ...event, location: e.target.value })
                    }
            required
          />
        </div>
 
<div className="form-group">
        <input
          className="form-control"
          type="file"
          accept=".jpg,.png,.jpeg"
          name="image"
          onChange={pickedHandler}
          ref={filePickerRef}

        //  onChange={(e)=>setEvent({...event,image:e.target.files[0]})}
        />
      </div>
        <div className="form-group">
        <label>Start date </label>
        <input type="date"  onChange={
          (e) =>{
            const newDate = new Date(e.target.value);
            setEvent({...event,Startdate:newDate})
          }
        } />
</div>
<div className="form-group">
        <label>End date </label>
        <input type="date" onChange={
          (e) =>{
            const newDate = new Date(e.target.value);
            setEvent({...event,Enddate:newDate})
          }
        } />
</div>
        
 
        <Container>
      <Button className={classes.root} type="submit" onClick={HandleSubmit} >Create now Test</Button>
           
 
        </Container>
      </div>

     
      </div>  </div>
  );

}


export default CreateEvent;
