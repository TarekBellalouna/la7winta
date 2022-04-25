import React, { useState } from "react";
import axios from "axios";
import validate from './validateinfo';
import { Link, Route, Router, useHistory } from "react-router-dom";

function AddAuctionArea() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [currentPrice, setcurrentPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [catergory, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState();
  const [auctionStarted, setAuctionstarted] = useState(false);
  let history = useHistory();


  const handleAddAuction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName",productName );
    formData.append("description", description);
    formData.append("Price", Price);
    formData.append("image", image);
    formData.append("currentPrice", currentPrice);
    formData.append("duration", duration);
    formData.append("catergory", catergory);
    setErrors(validate(formData));
    axios.post("http://127.0.0.1:5000/auction/upload",formData ,history.push('/auction')
    ,{ headers : {
      "Content-Type": "multipart/form-data",
    } ,
    })
    .then((res)=> {
      if (res.data.message === "Auction added") {
                      setMessage(productName + " added");
                      setProductName("");
                      setDescription("");
                      setCategory("");
                      setImage("");
                      setPrice("");
                      setDuration("");
                      setcurrentPrice("");
                      setAuctionstarted(true);
                      setErrors('');
                     
                    }
        })
    .catch(function (error) {
      console.log(error);
    });

  }

  
  return (
    <div className="add-auction-area-wrap ptb-50">
      <div className="container">
        <div className="add-auction-form">
          {message == "" && (
            <div className={`alert alert-success`} role="alert">
              {message}
            </div>
          )}
          <h2>Add Auction</h2>
          <hr />
          <form onSubmit={handleAddAuction} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              {productName ==='' && <p className="error_color">{errors.productName}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="description">Product Description</label>
              <textarea
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              ></textarea>
              {description === '' && <p className="error_color">{errors.description}</p>}
            </div>


            <div className="form-group">
              <label htmlFor="product_images">Product Image</label>
              <input
                type="file"
                name="image"
                className="form-control"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {image === '' && <p className="error_color">{errors.image}</p>}
            </div>

           
           

            <div className="form-group">
              <label htmlFor="duration">Price</label>
              <input
                className="form-control"
                type="number"
                id="Price"
                value={Price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              ></input>
              {Price === '' && <p className="error_color">{errors.Price}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration</label>
              <input
                className="form-control"
                type="number"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Duration"
              ></input>
              {duration === '' && <p className="error_color">{errors.duration}</p>}
            </div>

           




          
            <div className="form-group">
              <label htmlFor="catergory">Catergory</label>
              <select
                className="form-control"
                value={catergory}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>All Type</option>
                <option value="accessories">Accessories</option>
                <option value="audio">Audio</option>
                <option value="beauty_picks">Beauty Picks</option>
                <option value="cameras">Cameras</option>
                <option value="computers">Computers</option>
                <option value="electronics">Electronics</option>
                <option value="laptop">Laptop</option>
                <option value="mobile">Mobile</option>
                <option value="watches">Watches</option>
                <option value="headphone">Headphone</option>
              </select>
              {catergory === '' && <p className="error_color">{errors.catergory}</p>}
            </div>

           
           
            <button  type="submit" className="add-product-btn"><i className=" add-product-btn-icon"></i>Add Auction</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddAuctionArea;
