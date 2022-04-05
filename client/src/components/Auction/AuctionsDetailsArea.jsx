import React, { useContext, useState,useRef, useEffect } from "react";
import axios from "axios";
import Countdown from 'react-countdown';
import { useHistory, useParams } from "react-router-dom";
import { Image } from "cloudinary-react";
import CartContext from "../../contexts/cart-context";

function AuctionsDetailsArea() {
  const [auction, setAuction] = useState({});
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [currentPrice, setcurrentPrice] = useState("");
  const [currentPrice2, setcurrentPrice2] = useState("");
  const [duration, setDuration] = useState(0);

  const [category, setCategory] = useState("");
  const { auctionId } = useParams();
  const context = useContext(CartContext);

  useEffect(() => {
    axios
      .get("/auction/fetch-auction/" + auctionId)
      .then((res) => {

        setAuction(res.data.auction);
        setDuration(res.data.auction.duration)
        setcurrentPrice(res.data.auction.currentPrice)


      })
      .catch((err) => console.log(err));
  }, []);






  const openDeleteModal = (currentPrice) => {
    setcurrentPrice(currentPrice);
  };


  
  // useEffect(() => {
  //   e.preventDefault();
  //    axios.post()
  //    ("/auction/addbid", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
      
  //       currentPrice,currentPrice
       
  //     }
  //     ),
  //   } 
  //   ) .then((res) => res.json())
  //           .then((res) => {
  //             if (res.data.message === "Bid added") {
  //               setcurrentPrice(res.data.auction.currentPrice)
  //             }
  //           })
        
  //     .catch((err) => {
  //     console.log(err.data)
  //     });
  // };

  const [running, setRunning] = useState(false);

  let history = useHistory();

  function updateCurrentPrice(){

    let auction={currentPrice}
    console.log(auctionId)
    fetch ("/auction/addbid/"+ auctionId, {
          method: "PUT",
          headers: { "Accept":"application/json",
          "Content-Type": "application/json" },
          body: JSON.stringify({
            currentPrice: currentPrice2
          }
          ),
        } 
        ) .then((res) => res.json())
                .then((resp) => {
                  setTimer(duration)
                    setcurrentPrice(currentPrice2)
                  
                  console.log(resp)
                })
            
         

  }
 





  const Ref = useRef(null);
  
  // The state for our timer
  const [timer, setTimer] = useState( );


  const getTimeRemaining = (e) => {
      const total = Date.parse(e) - Date.parse(new Date());
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / 1000 * 60 * 60) % 24);
      return {
          total, hours, minutes, seconds
      };
  }


  const startTimer = (e) => {
      let { total, hours, minutes, seconds } 
                  = getTimeRemaining(e);
      if (total >= 0) {

          // update the timer
          // check if less than 10 then we need to 
          // add '0' at the begining of the variable
          setTimer(
              (hours > 9 ? hours : '0' + hours) + ':' +
              (minutes > 9 ? minutes : '0' + minutes) + ':'
              + (seconds > 9 ? seconds : '0' + seconds)
          )
      }
  }


  const clearTimer = (e) => {

      // If you adjust it you should also need to
      // adjust the Endtime formula we are about
      // to code next    
      setTimer('00:00:00');

      // If you try to remove this line the 
      // updating of timer Variable will be
      // after 1000ms or 1sec
      if (Ref.current) clearInterval(Ref.current);
      const id = setInterval(() => {
          startTimer(e);
      }, 1000)
      Ref.current = id;
  }

  const getDeadTime = () => {
      let deadline = new Date();

      // This is where you need to adjust if 
      // you entend to add more time
      deadline.setHours(deadline.getHours() + 2);
      return deadline;
  }

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
      clearTimer(getDeadTime());
  }, []);



  return  (
    <section className="products-details-area ptb-50">
      <div className="container">
        <div className="products-details-desc">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="main-products-image">
                <div className="slider slider-for">
                  <div>
                    <img src={auction.image} width="500" alt={auction.productName}  />
                  </div>
                </div>
              </div>
            </div>
           
            <div className="col-lg-6 col-md-6">
              <div className="product-content content-two">
                <h3>Product Name: {auction.productName}</h3>
                <hr></hr>

                <div className="c">
                  <span className="new-price">Category: {auction.catergory}</span>
                </div>
              <hr></hr>
                <div className="price">
                 <span className="new-price" >Start Price: {auction.Price}$</span>
                </div>
                <hr></hr>
               
               <div className="countdown">
               <span className="new-price" >Time Left: {timer}
               </span>     
                </div>
                <hr></hr>
                <div className="price">
                 <span className="new-price" >Current Bid: {currentPrice}$</span>
                </div>



                {/* <ul className="products-info">
                  <li>
                    <span>Availability:</span>{" "}
                    {product.total_in_stock > 0
                      ? `In stock (${product.total_in_stock})`
                      : "Stock finished"}
                  </li>
                  <li>
                    <span>SKU:</span> <a href="#">L458-25</a>
                  </li>
                </ul> */}

               
               

                <div className="">

                <input
                type="number"
                className="form-control"
                placeholder="bid here"
                id="currentprice"
                value={currentPrice2 }
                onChange={(e) => setcurrentPrice2(e.target.value)}
              />
              <br></br>
                  <button
                    type="submit"
                    className="default-btn"
                    onClick={updateCurrentPrice}
                    >
                    Bid
                    <span></span>
                  </button>
                </div>

                <div className="products-share">
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="products-details-tabs">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                id="description-tab"
                data-toggle="tab"
                href="#description"
                role="tab"
                aria-controls="description"
              >
                Description
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="reviews-tab"
                data-toggle="tab"
                href="#reviews"
                role="tab"
                aria-controls="reviews"
              >
                Reviews
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="information-tab"
                data-toggle="tab"
                href="#information"
                role="tab"
                aria-controls="information"
              >
                Shipping Information
              </a>
            </li>
          </ul>

          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="description"
              role="tabpanel"
            >
              <h2>Overview</h2>

             <div>{auction.description}</div>
            </div>

            <div className="tab-pane fade" id="reviews" role="tabpanel">
              <div className="products-reviews">
                <h3>Reviews</h3>

                <div className="row">
                  <div className="side">
                    <div>5 star</div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <div className="bar-5"></div>
                    </div>
                  </div>
                  <div className="side right">
                    <div>70%</div>
                  </div>
                  <div className="side">
                    <div>4 star</div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <div className="bar-4"></div>
                    </div>
                  </div>
                  <div className="side right">
                    <div>20%</div>
                  </div>
                  <div className="side">
                    <div>3 star</div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <div className="bar-3"></div>
                    </div>
                  </div>
                  <div className="side right">
                    <div>5%</div>
                  </div>
                  <div className="side">
                    <div>2 star</div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <div className="bar-2"></div>
                    </div>
                  </div>
                  <div className="side right">
                    <div>3%</div>
                  </div>
                  <div className="side">
                    <div>1 star</div>
                  </div>
                  <div className="middle">
                    <div className="bar-container">
                      <div className="bar-1"></div>
                    </div>
                  </div>
                  <div className="side right">
                    <div>2%</div>
                  </div>
                </div>
              </div>

              <div className="products-review-form">
                <h3>Customer Reviews</h3>

                <div className="review-title">
                  <div className="rating">
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                  </div>

                  <a href="#" className="default-btn">
                    Write a Review
                    <span></span>
                  </a>
                </div>

                <div className="review-comments">
                  <div className="review-item">
                    <div className="rating">
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                    </div>
                    <h3>Good</h3>
                    <span>
                      <strong>Admin</strong> on <strong>Sep 21, 2019</strong>
                    </span>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation.
                    </p>
                  </div>

                  <div className="review-item">
                    <div className="rating">
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                    </div>
                    <h3>Good</h3>
                    <span>
                      <strong>Admin</strong> on <strong>Sep 21, 2019</strong>
                    </span>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation.
                    </p>
                  </div>

                  <div className="review-item">
                    <div className="rating">
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                    </div>
                    <h3>Good</h3>
                    <span>
                      <strong>Admin</strong> on <strong>Sep 21, 2019</strong>
                    </span>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation.
                    </p>
                  </div>
                </div>

                <div className="review-form">
                  <h3>Write a Review</h3>

                  <form>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            id="review-title"
                            name="review-title"
                            placeholder="Enter your review a title"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <textarea
                            name="review-body"
                            id="review-body"
                            cols="30"
                            rows="6"
                            placeholder="Write your comments here"
                            className="form-control"
                          ></textarea>
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12">
                        <button type="submit" className="default-btn">
                          Submit Review
                          <span></span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div
              className="tab-pane fade show"
              id="information"
              role="tabpanel"
            >
              <ul className="information-list">
                <li>
                  Address:{" "}
                  <span>4848 Hershell Hollow Road, Bothell, WA 89076</span>
                </li>
                <li>
                  Phone: <a href="tel:+15143214567">+1 (514) 321-4567</a>
                </li>
                <li>
                  Email: <a href="mailto:hello@ejon.com">hello@ejon.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuctionsDetailsArea;
