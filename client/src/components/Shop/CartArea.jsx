import React, { useContext, useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout';
import CartContext from "../../contexts/cart-context";
import axios from 'axios';

const KEY = "pk_test_51KhtEeEH3igSvawdpmzWGHuHvEuB0URizBnJ7Y7hm6vYH7weE9b7NGZfkhYIc3ixuE85loj2p3Ox6mF0KCrEgn1b00ptCX1Iux"


function CartArea() {
  const [stripeToken, setStripeToken] = useState(null);
  const [couponcode, setCouponcode] = useState("");
  const [coupon, setCoupon] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState("");

const handleChange = (e) => setCouponcode(e.target.value)


  const onToken = (token) =>{
      console.log(token);
      setStripeToken(token);
  }
  
  /*useEffect(()=>
  {
    if(couponcode!="")
    try{
    axios.post('http://localhost:5000/coupon/getCoupon/',{code : couponcode,}).then((response)=>{
      const res = response.data;
      //console.log(res[0].value);
      setCoupon(res[0].value)
    })
  }catch(err){
    console.log("err coupon", err);
    setCoupon(0);
  }


  },[couponcode])
  */
 
 

const applyCoupon = (e)=>{
  e.preventDefault();
  axios.post('http://localhost:5000/coupon/getCoupon/',{code : couponcode,}).then((response)=>{
    const res = response.data;
    //console.log("res[0].value: ", res[0].value);
    if(res[0] != null && res[0].isUsed === "no")
      {setCoupon(res[0].value);

        axios.put(`http://localhost:5000/coupon/${res[0]._id}/use`);
      }

    else if(res[0] == null)
    {setMessage("This code is invalid.");
    setTimeout(() => { setMessage("");}, 1200);
  }
  else if(res[0].isUsed === "yes")
    {setMessage("This code has been used.");
    setTimeout(() => { setMessage("");}, 1200);
  }
    //console.log("coupon : ", coupon);

  })  

  
}



  useEffect(()=>{
    const makeRequest = async ()=>{
      try{
        const res = await axios.post("http://localhost:5000/stripe/payment", {
          tokenId:stripeToken.id,
          amount: 100,
        })//.then((response)=>{console.log(response);})
        console.log(res,"works");
      }catch(err){
        console.log("error react: ",err)
      }
    };
    stripeToken && makeRequest();
  },[stripeToken]);
  

  const context = useContext(CartContext);

  const updateQuantity = (cartItem, quantity) => {
    console.log(quantity);
    if (quantity < 0) return;
    let currentItem = {
      _id: cartItem._id,
      name: cartItem.name,
      price: cartItem.price,
      type: cartItem.type,
      total_in_stock: cartItem.total_in_stock,
      image_public_id: cartItem.image_public_id,
      quantity,
    };
    context.addItemToCart(currentItem);
  };

  return (
    <section className="cart-area ptb-50">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <form>
              <div className="cart-table table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Name</th>
                      <th scope="col">Unit Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {context.cartItems &&
                      context.cartItems.map((cartItem) => {
                        return (
                          <tr className="top-className" key={cartItem._id}>
                            <td className="product-thumbnail">
                              <span
                                onClick={() =>
                                  context.removeItemFromCart(cartItem._id)
                                }
                                className="remove"
                              >
                                <i className="bx bx-x"></i>
                              </span>
                                  
                              <a href="#">
                               <img src={cartItem.image} width="70" alt="" />
                              </a>
                            </td>

                            <td className="product-name">
                              <Link to={`/products-details/${cartItem._id}`}>
                                {cartItem.name}
                              </Link>
                            </td>

                            <td className="product-price">
                              <span className="unit-amount">
                                ${cartItem.price}
                              </span>
                            </td>

                            <td className="product-quantity">
                              <div className="input-counter">
                                <span
                                  className="minus-btn"
                                  onClick={() =>
                                    updateQuantity(
                                      cartItem,
                                      parseInt(cartItem.quantity - 1)
                                    )
                                  }
                                >
                                  {cartItem.quantity < 1
                                    ? context.removeItemFromCart(cartItem._id)
                                    : null}
                                  <i className="bx bx-minus"></i>
                                </span>
                                <input
                                  type="number"
                                  value={cartItem.quantity}
                                  onChange={(e) =>
                                    updateQuantity(cartItem, e.target.value)
                                  }
                                  min="1"
                                  max={cartItem.total_in_stock}
                                />
                                <span
                                  className="plus-btn"
                                  onClick={() =>
                                    updateQuantity(
                                      cartItem,
                                      parseInt(cartItem.quantity + 1)
                                    )
                                  }
                                >
                                  <i className="bx bx-plus"></i>
                                </span>
                              </div>
                            </td>

                            <td className="product-subtotal">
                              <span className="subtotal-amount">
                                ${cartItem.quantity * parseInt(cartItem.price)}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              {!context.cartItems && (
                <div>
                  <h4>Empty cart</h4>
                </div>
              )}

              <div className="cart-buttons">
                <div className="row align-items-center">
                  <div className="col-lg-7 col-sm-7 col-md-7">
                    <div className="shopping-coupon-code">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Coupon code"
                        name="coupon-code"
                        id="coupon-code"
                        value={couponcode}
                        onChange={handleChange}
                      />
                     
                      <button onClick={applyCoupon}>Apply Coupon</button>

                      <br></br>

                     {coupon !== 0 && (
          <div
            className="alert alert-success"
            role="alert"
          >

            -{coupon} %
          </div>
        )}
        {message !== "" && (
          <div
            className="alert alert-danger"
            role="alert"
          >
            {message}
          </div>
        )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="col-lg-4 col-md-12">
            <div className="cart-totals">
              <h3>Cart Totals</h3>

              <ul>
                <li>
                  Subtotal{" "}
                  <span>
                    $
                    {(context.cartItems &&
                      context.cartItems.reduce((count, curItem) => {
                        return (
                          (count +
                          parseInt(curItem.price) *
                            parseInt(curItem.quantity || 0)) 
                           
                        );
                      }, 0)) ||
                      0}
                  </span>
                </li>
                <li>
                  Coupon <span>{coupon}%</span>
                </li>
                
                <li>
                  Payable Total{" "}
                  <span>
                    $
                    {((context.cartItems &&
                      context.cartItems.reduce((count, curItem) => {
                        return (
                          (count +
                          parseInt(curItem.price) *
                            parseInt(curItem.quantity || 0)) 
                            - 
                            coupon * (
                              parseInt(curItem.price) *
                                parseInt(curItem.quantity || 0)) /100
                        );
                      }, 0)) ||
                      0)}
                  </span>
                </li>
              </ul>

            <StripeCheckout 
            name="username"
            billingAddress
            shippingAddress
            description={`Your total is $ ${((context.cartItems &&
              context.cartItems.reduce((count, curItem) => {
                return (
                  (count +
                  parseInt(curItem.price) *
                    parseInt(curItem.quantity || 0)) 
                    - 
                    coupon * (
                      parseInt(curItem.price) *
                        parseInt(curItem.quantity || 0)) /100
                );
              }, 0)) ||
              0)}`}
            /*amount={((context.cartItems &&
              context.cartItems.reduce((count, curItem) => {
                return (
                  (count +
                  parseInt(curItem.price) *
                    parseInt(curItem.quantity || 0)) 
                    - 
                    coupon * (
                      parseInt(curItem.price) *
                        parseInt(curItem.quantity || 0))
                );
              }, 0)) ||
              0)}*/
            token={onToken}
            stripeKey={KEY}
            >              <button style={{ cursor: "pointer" }} className="default-btn">Use Card</button>

            </StripeCheckout>



              <button className="proceed_button">
                {context.cartItems.length === 0 ? (
                  <Link
                    to=""
                    className="disable-btn"
                    onClick={(event) => event.preventDefault()}
                  >
                    Cash On Delivery
                    <span></span>
                  </Link>
                ) : (
                  
                  <Link to="/checkout"className="default-btn">
                    Cash On Delivery
                    <span></span>
                  </Link>
                )}
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartArea;
