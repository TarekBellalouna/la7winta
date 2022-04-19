import React, { useState, useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams} from "react-router";
function EditEvent() {


  const params =useParams();

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
  useEffect(()=> {
    getEvent();
  }, []);
  
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
    const userId =JSON.parse(localStorage.getItem('user'))._id
    const form = new FormData();
    form.append('title' , event.title );
    form.append('description' , event.description );
    form.append('user' , userId );
    form.append('location' , event.description );
    form.append('Startdate' , event.Startdate );
    form.append('Enddate' , event.Enddate );
    form.append('image' , File ); 
    console.log(form);
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    
    const response = await axios.put(`http://localhost:5000/event/update/?idEvent=${params.id}`, form, config)
     
    console.log({response})
  }



  return (

    <div className="register-form">
       
      <h2>Edit Event</h2>

      <div>
      <form onSubmit={(e)=>{
        e.preventDefault()
        HandleSubmit()
  }} >
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="title"
            value={event.title}
            onChange={(e) =>
                        setEvent({ ...event, title: e.target.value })
                    }
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="description"
            value={event.description}
            onChange={(e) =>
                        setEvent({ ...event, description: e.target.value })
                    }
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="location"
            value={event.location}
            onChange={(e) =>
                        setEvent({ ...event, location: e.target.value })
                    }
            required
          />
        </div>
        <div className="form-group">
        <label>Start date </label>
        <input type="date" onChange={
          (e) =>{
            const newDate = new Date(e.target.value);
            setEvent({...event,Startdate:newDate})
          }
        }
        required

         />
</div>

<div className="form-group">
        <label>End date </label>
        <input type="date" onChange={
          
          (e) =>{
            const newDate = new Date(e.target.value);
            setEvent({...event,Enddate:newDate})
          }
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
  required
        //  onChange={(e)=>setEvent({...event,image:e.target.files[0]})}
        />
      </div>
 

        <button type="submit" >Edit</button>
     

</form>
      </div>
    </div>
  );

}


export default EditEvent;
