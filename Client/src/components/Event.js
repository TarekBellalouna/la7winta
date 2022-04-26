import React, {Fragment, useState} from 'react';
//import { setAlert } from '../../actions/alert';
import { Link, Navigate } from 'react-router-dom';


const CreateEvent = ({ createE }) => {
    const [formData, setFormData] = useState({
      title: '',
      description: '' 
    });
  
    const { title, description } = formData;
  
    const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });


      const onSubmit = async (e) => {
        e.preventDefault();
        if (title !== description) {
         console.log('description do not match', 'danger');
        } else {
            createE({ title, description });
        }
      };
 
    return (
        <section className="container">  
         <form className="form"  >
        <div className="form-group">
          <input
            type="text"
            placeholder="title" 
            name="title"
            value={title}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="description"
            placeholder="description" 
            name="description"
            value={description}
            onChange={onChange}
          />
          <small className="form-text">
           This event is ...
          </small>
        </div>
         
       
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        want to see donations? <Link to="/Donation">see donations</Link>
      </p>

      </section>
    );
};
 
export default  CreateEvent;