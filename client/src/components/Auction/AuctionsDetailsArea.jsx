import React, { useContext, useState,useRef, useEffect } from "react";
import axios from "axios";
import Countdown from 'react-countdown';
import { hot } from 'react-hot-loader/root';
import { useHistory, useParams } from "react-router-dom";
import { Image } from "cloudinary-react";
import CartContext from "../../contexts/cart-context";
import socketIOClient from "socket.io-client";

function AuctionsDetailsArea({auctions,   editAuction }) {

  // Random component
  const Completionist = () => <span>Expired!</span>;
  
  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return <span>{hours}:{minutes}:{seconds}</span>;
    }
  };
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
  const ENDPOINT = "http://localhost:5000/";


  useEffect(() => {
    console.log(Date.now())
    const socket = socketIOClient(ENDPOINT);
    console.log(auctionId)
    socket.on("newBid"+auctionId,(a)=>{
        console.log(a)
        setcurrentPrice(a["price"])

      })

    axios
      .get("/auction/fetch-auction/" + auctionId)
      .then((res) => {

        setAuction(res.data.auction);
        setDuration(res.data.auction.duration)
        setcurrentPrice(res.data.auction.currentPrice)


      })
      .catch((err) => console.log(err));
  }, []);

  const openDeleteModal = (auctionId) => {
    setAuction(auction);
  };

  
  const openEditModal = (auction) => {
    
    setAuction(auction);
    setProductName(auction.productName);
    setDescription(auction.description);
    setPrice(auction.Price);
    setCategory(auction.catergory);
    setDuration(auction.duration);
    setcurrentPrice(auction.currentPrice);
    
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
  const [counter,setCounter] = useState();
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
                 // setTimer(duration)
                  console.log("aaaaaaaaaaaaaaa")
                    setcurrentPrice(currentPrice2)
                    
                //     const socket = io.connect("http://localhost:5000/");

                // socket.emit("ss",{message:"aa"});
                
                  console.log(resp)
                })
              
         

  }
 





  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    //  clearTimer(getDeadTime());
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
                  <img src={auction.image} alt={auction.name} width="500"  />

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
               <span className="new-price" >Time Left: <Countdown date={ Date.now()+Date.parse(duration) *36000} renderer={renderer}/>
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
        </div><br></br>
       <div className="center">
      
        &nbsp;
        <button  className="default-btn" onClick={()=>openDeleteModal(auction)}>Delete</button>
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

export default hot(AuctionsDetailsArea);
