import React, { useContext, useState, useEffect,useRef } from "react";
import axios from "axios";
import Rate from "./Rate";
import { useParams } from "react-router-dom";
import { Image } from "cloudinary-react";
import CartContext from "../../contexts/cart-context";
import dateFormat from 'dateformat';

function ProductsDetailsArea() {
  const title = useRef();
  const contenue = useRef();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [comment, setComment] = useState([]);
  const [moyStar, setmoyStar] = useState([]);
  let [nbTotStar, setnbTotStar] = useState(0);
  const [nbComment, setnbComment] = useState(0);
  const [rating, setRating] = useState(0);
  const [nbRate, setnbRate] = useState(0);
  let [fivestar, setfivestar] = useState(0);
  let [fourstar, setfourstar] = useState(0);
  let [threestar, setthreestar] = useState(0);
  let [twostar, settwostar] = useState(0);
  let [onestar, setonestar] = useState(0);
 // const [rating2, setRating2] = useState(0);
  const { productId } = useParams();
  const context = useContext(CartContext);
  const prod = productId;
 const username = "623b4abf641c0826743174ae";
  const star = rating;
  const [message, setMessage] = useState(null);
  const [messageComm, setMessageComm] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const handleRating = (e) =>{
    e.preventDefault();
    if(star==0)
    {setMessageError("thabet min rou7ik ya khra!!")
     setMessage(null) }
    else
   { fetch("/ratings/add-rating", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product: prod,
        user: username,
        nb_etoile: star,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "Rating added") {
          console.log(res);
          setnbRate(nbRate+1)
          switch (star) {
            case 5:
              setfivestar(fivestar+1)
              break;
              case 4:
                setfourstar(fourstar+1)
                break;
                case 3:
                  setthreestar(threestar+1)
                  break;
                  case 2:
                    settwostar(twostar+1)
                    break;
                    case 1:
                      setonestar(onestar+1)
                      break;
          
            default:console.log("laaaaaaaaaaaaaaaaaaaa")
              break;
          }

          setRating(0);
          setMessageError(null);
          setMessage("Rate successfully added");
        } else if (res.errors) {
          let errors = Object.values(res.errors);
          setMessage(errors);
        }
      })
      .catch((err) => console.log(err));}
  }
  const handleComment = (e) =>{
    e.preventDefault();
    // if(star==0)
    // {setMessageError("thabet min rou7ik ya khra!!")
    //  setMessage(null) }
    // else
    fetch("/comments/add-comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title:title.current.value,
        contenue:contenue.current.value,
        product: prod,
        user: username,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "Comment added") {
          console.log(res.comment);
       // setComment(res.comment);
       comment[nbComment]=res.comment;
       setnbComment(nbComment+1);
         title.current.value = "";
         contenue.current.value = "";
          setMessageComm("Comment successfully added");
        } else if (res.errors) {
          let errors = Object.values(res.errors);
          setMessage(errors);
        }
      })
      .catch((err) => console.log(err));
  }
  const deleteComment = (e) =>{
   // e.preventDefault();
    // if(star==0)
    // {setMessageError("thabet min rou7ik ya khra!!")
    //  setMessage(null) }
    // else
    fetch("/comments/delete-comment", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id:e._id,
       
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "Successfully Deleted") {
          console.log("tfasakh");
          let newcomment = comment.filter((item)=>{
            return item!=e
          })
          setComment(newcomment)
        } else if (res.errors) {
          let errors = Object.values(res.errors);
          setMessage(errors);
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    axios
      .get("/products/fetch-product/" + productId)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("/comments/fetch-comment-byprod/" + productId)
      .then((res) => {
        setnbComment(res.data.comment.length);
        setComment(res.data.comment);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("/ratings/fetch-rating-byprod/" + productId)
      .then((res) => {
        //console.log(res.data.rating);
        setnbRate(res.data.rating.length);
        res.data.rating.map((e)=>(
        e.nb_etoile===5
        ?fivestar=fivestar+1
        : e.nb_etoile===4
          ?fourstar=fourstar+1
            :e.nb_etoile===3
            ?threestar=threestar+1
              :e.nb_etoile===2
              ?twostar=twostar+1
                :e.nb_etoile===1
                ?onestar=onestar+1
                   :console.log("mochkla")
        ))
        setfivestar(fivestar)
        setfourstar(fourstar)
        setthreestar(threestar)
        settwostar(twostar)
        setonestar(onestar)
        let tot=(fivestar*5)+(fourstar*4)+(threestar*3)+(twostar*2)+onestar
        console.log(tot)
        setnbTotStar(tot)
        console.log(fivestar)
       console.log(nbTotStar)
       console.log(nbRate)
        // for (let i = 0; i<Math.round(nbTotStar/nbRate); i++)
        // {
        //   console.log(i)
        //   moyStar[i]=i
        // }
       // setRatingAff(res.data.rating);
      })
      .catch((err) => console.log(err));
  }, []);


  const addToCart = (product) => {
    let currentItem = {
      _id: product._id,
      name: product.name,
      price: product.price,
      type: product.type,
      total_in_stock: product.total_in_stock,
      image_public_id: product.image_public_id,
      quantity,
    };
    context.addItemToCart(currentItem);
  };

  return (
    <section className="products-details-area ptb-50">
      <div className="container">
        <div className="products-details-desc">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="main-products-image">
                <div className="slider slider-for">
                  <div>
                    <Image
                      key={product.image_public_id}
                      cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                      publicId={product.image_public_id}
                      width="500"
                      crop="scale"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="product-content content-two">
                <h3>{product.name}</h3>

                <div className="product-review">
                  <div className="rating">
                  { moyStar.map((e)=>(
                     <i className="bx bxs-star"></i>
                  ))}
                    {/* <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i> */}
                    
                  </div>
                </div>

                <div className="price">
                  <span className="old-price">$150.00</span>
                  <span className="new-price">${product.price}</span>
                </div>
                <p>{product.description}</p>

                <ul className="products-info">
                  <li>
                    <span>Availability:</span>{" "}
                    {product.total_in_stock > 0
                      ? `In stock (${product.total_in_stock})`
                      : "Stock finished"}
                  </li>
                  <li>
                    <span>SKU:</span> <a href="#">L458-25</a>
                  </li>
                </ul>

                <div className="products-color-switch">
                  <p className="available-color">
                    <span>Color</span> :
                    <a href="#" style={{ backgroundColor: "#a53c43" }}></a>
                    <a href="#" style={{ backgroundColor: "#192861" }}></a>
                    <a href="#" style={{ backgroundColor: "#c58a84" }}></a>
                    <a href="#" style={{ backgroundColor: "#ecc305" }}></a>
                    <a href="#" style={{ backgroundColor: "#000000" }}></a>
                    <a href="#" style={{ backgroundColor: "#808080" }}></a>
                  </p>
                </div>

                <div className="product-quantities">
                  <span>Quantities:</span>

                  <div className="input-counter">
                    <span
                      className="minus-btn"
                      onClick={() =>
                        quantity >= 1
                          ? setQuantity(quantity - 1)
                          : setQuantity(1)
                      }
                    >
                      <i className="bx bx-minus"></i>
                    </span>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                      max={product.total_in_stock}
                    />
                    <span
                      className="plus-btn"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <i className="bx bx-plus"></i>
                    </span>
                  </div>
                </div>

                <div className="product-add-to-cart">
                  <button
                    type="submit"
                    className="default-btn mr-2"

                    onClick={() => addToCart(product)}
                  >
                    <i className="flaticon-shopping-cart"></i>
                    Add to cart
                    <span></span>
                  </button>
                  <button
                    type="submit"
                    className="default-btn"
                    onClick={() =>  window.location.href='/chatbot'}
                  >
                    {/* <i className="flaticon-shopping-cart"></i> */}
                    ChatBot
                    <span></span>
                  </button>

                </div>

                <div className="products-share">
                  <ul className="social">
                    <li>
                      <span>Share:</span>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="bx bxl-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="bx bxl-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="bx bxl-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="bx bxl-instagram"></i>
                      </a>
                    </li>
                  </ul>
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

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea com modo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea com modo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore fugiat
                nulla pariatur.
              </p>

              <ul>
                <li>
                  It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged.
                </li>
                <li>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text.
                </li>
                <li>
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters.
                </li>
                <li>
                  Various versions have evolved over the years, sometimes by
                  accident sometimes on purpose.
                </li>
                <li>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore fugiat nulla pariatur.
                </li>
              </ul>
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
                    <div>{Math.round(100*fivestar/nbRate)}%</div>

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
                    <div>{Math.round(100*fourstar/nbRate)}%</div>

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
                    <div>{Math.round(100*threestar/nbRate)}%</div>

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
                    <div>{Math.round(100*twostar/nbRate)}%</div>

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
                    <div>{Math.round(100*onestar/nbRate)}%</div>

                  </div>
                </div>
              </div>

              <div className="products-review-form">
                <h3>Customer Reviews</h3>
                <form onSubmit={handleRating}>
                  <div className="review-title">
                    {/* <div className="rating">

                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                      <i className="bx bxs-star"></i>
                    </div> */}
                    <Rate rating={rating} onRating={(rate) => setRating(rate)}/>
                      <p>Rating - {rating}</p>
                    {/* <a href="#" className="default-btn">
                      Write a Review
                      <span></span>
                    </a> */}
                    <button className="default-btn" type="submit"> Add a Review</button>
                  </div>
                </form>
                {messageError &&
        (Array.isArray(messageError) ? (
          <div className="alert alert-danger" role="alert">
            <ul className="errors" style={{ marginBottom: 0 }}>
              {messageError.map((msg) => (
                <li key={msg} className="error">
                  {msg}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className={`alert alert-danger `} role="alert">
            {messageError}
          </div>
        ))}
                {message &&
        (Array.isArray(message) ? (
          <div className="alert alert-danger" role="alert">
            <ul className="errors" style={{ marginBottom: 0 }}>
              {message.map((msg) => (
                <li key={msg} className="error">
                  {msg}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className={`alert alert-success`} role="alert">
            {message}
          </div>
        ))}

                { comment.map((e)=>(
                  <div className="review-comments">
                    <div className="review-title">
                      {/* <div className="rating">
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                      </div> */}
                      <h3>{e.title}</h3>
                      <span>
                        <strong>Admin</strong> on <strong>{dateFormat(e.comment_date,"mmm d, yyyy")}</strong>
                      </span>
                      <p>
                        {e.contenue}
                      </p>
                      {/* <button className="default-btn" type="submit"> <i className="bx bx-trash"></i></button> */}
                      <button type="submit"    onClick={() => deleteComment(e)}>
                        <i className="bx bx-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}

                   {messageComm &&
                    (Array.isArray(messageComm) ? (
                      <div className="alert alert-danger" role="alert">
                        <ul className="errors" style={{ marginBottom: 0 }}>
                          {messageComm.map((msg) => (
                            <li key={msg} className="error">
                              {msg}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className={`alert alert-success`} role="alert">
                        {messageComm}
                      </div>
                    ))}


                <div className="review-form">
                  <h3>Write a Review</h3>

                  <form onSubmit={handleComment}>
                    <div className="row">
                      {/* <div className="col-lg-6 col-md-6">

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
                      </div> */}

                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <input
                            type="text"
                            id="review-title"
                            name="review-title"
                            placeholder="Enter your review a title"
                            className="form-control"
                            ref={title}
                            required

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
                            ref={contenue}
                            required

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

export default ProductsDetailsArea;
