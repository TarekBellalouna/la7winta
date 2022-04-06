import React, { useState, useEffect, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { Image } from "cloudinary-react";
import axios from "axios";
import authContext from "../../contexts/auth-context";
import Countdown from "react-countdown";

function AuctionsArea({  history, editAuction ,page, pages, keyword,showQuickView}) {
  const [auction, setAuction] = useState([]);
  const [delauction, setdelAuction] = useState({});
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [currentPrice, setcurrentPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [catergory, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});


  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");


  const [product_images, setProductImages] = useState("");
  const context = useContext(authContext);

  // useEffect(() => {
  //   axios
  //     .post("/user/check-role", {
  //       userId: context.userId,
  //     })
  //     .then((res) => setRole(res.data.role))
  //     .catch((err) => console.log(err));
  // }, []);

  
  useEffect(() => {
    axios .get("/auction")
      .then((res) => {
        setAuction(res.data.auction);
      })
      .catch((err) => console.log(err));
  }, []);

  const goToDetails = (id) => {
    history.push(`/auction-details/${id}`);
  };

  const openDeleteModal = (auction) => {
    
  };
  const deleteAuction = (_id) => {
    axios
      .post(`/auction/delete-auction`, {
        auctionId: _id,
      })
      .then((res) => {
        if (res.data.message === "Successfully Deleted") {
          setAuction(res.data.auctions);
        }
      })
      .catch((err) => console.log(err));
  };
  const openEditModal = (auction, imagePublicId) => {
    
    setAuction(auction);
    setProductName(auction.productName);
    setDescription(auction.description);
    setPrice(auction.Price);
    setCategory(auction.catergory);
    setDuration(auction.duration);
    setcurrentPrice(auction.currentPrice);
    
  };


  const bidends = () => {
    let endTime = new Date("August 23, 2022 17:00:00 PDT");
    let endTimeParse = Date.parse(endTime) / 1000;
    let now = new Date();
    let nowParse = Date.parse(now) / 1000;
    let timeLeft = endTimeParse - nowParse;
    let countdays = Math.floor(timeLeft / 86400);
    let counthours = Math.floor((timeLeft - countdays * 86400) / 3600);
    let countminutes = Math.floor(
      (timeLeft - countdays * 86400 - counthours * 3600) / 60
    );
    let countseconds = Math.floor(
      timeLeft - countdays * 86400 - counthours * 3600 - countminutes * 60
    );
    if (counthours < "10") {
      counthours = "0" + counthours;
    }
    if (countminutes < "10") {
      countminutes = "0" + countminutes;
    }
    if (countseconds < "10") {
      countseconds = "0" + countseconds;
    }

    setDays(countdays);
    setHours(counthours);
    setMinutes(countminutes);
    setSeconds(countseconds);
  };

  useEffect(() => {
    setInterval(() => {
      bidends();
    }, 1000);
  }, []);



  
  // const handleChange = async e => {

  //   const image = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append("file", image);
  //   formData.append("upload_preset", "econix");
  //   const config = {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   };

  //   const { data } = await axios.post(
  //     "https://api.cloudinary.com/v1_1/dfmn9nhqt/image/upload",
  //     formData,
  //     config
  //   );

  //   setProductImages(data.public_id);
  // };

  return (
    <section className="shop-area bg-ffffff pt-50 pb-50">
      <Link to="/add-auction" > <button className="btn primary">Add Auction</button> </Link>

    <div className="container">
      <div className="products-filter-options">
        <div className="row align-items-center">
          <div className="col-lg-9 col-md-9">
            <p>Showing 1 – 18 of 100</p>
          </div>

        
        </div>
      </div>
      <div className="row">
        {auction &&
          auction.map((auction) => (
            <div className="col-lg-3 col-sm-6" key={auction._id}>
              <div className="single-shop-products">
                <div className="shop-products-image">
                  <Link to={`/auctions-room/${auction._id}`}>
                  <img src={auction.image} alt={auction.name} width="300"  />

                  </Link>
                  <div className="tag">New</div>
                  <ul className="shop-action">
                    <li>
                      <Link to="#">
                        <i className="flaticon-heart"></i>
                      </Link>
                    </li>
                    {/* <li>
                      <span
                        onClick={() => showQuickView(auction)}
                        data-toggle="modal"
                        data-target="#productsQuickView"
                        className="quick-icon"
                      >
                        <i className="flaticon-view"></i>
                      </span>
                    </li> */}
                  </ul>
                </div>

                <div className="shop-products-content">
                  <h3>
                    <Link to={`/auctions-room/${ auction._id}`}>
                      {auction.productName}
                    </Link>
                  </h3>
                  
                Start Price: <span>{auction.Price}</span>
 
                  <diV>
                 Duration <span>{auction.duration}</span>
                  </diV>   
                      
                </div>
              </div>
              {/* test timer */}


              

            </div>
          ))}

        <div className="col-lg-12 col-md-12">
          <div className="pagination-area">
            <Link to={`/page/${page - 1}`
              } className="prev page-numbers">
              <i className="flaticon-left-arrow"></i>
            </Link>

            {[...Array(pages).keys()].map((x) => (
              <div key={x + 1}>
                <Link
                  to={
                    keyword
                      ? `/search/${keyword}/page/${x + 1}`
                      : `/page/${x + 1}`
                  }
                >
                  <span className={ x+1 === page ? 'current page-numbers' : 'page-numbers'}>{x + 1}</span>
                </Link>
              </div>
            ))}

            <Link
              to={`/page/${page + 1}`
              }
              className="next page-numbers"
            >
              <i className="flaticon-right-arrow"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}


    
 

export default withRouter(AuctionsArea);
