import React, { useContext, useState } from "react";
import CartContext from "../../contexts/cart-context";
import AuthContext from "../../contexts/auth-context";
import axios from "axios";

function CheckoutArea() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [message, setMessage] = useState("");

  const context = useContext(CartContext);
  const authContext = useContext(AuthContext);

   context.cartItems.itemsPrice =  context.cartItems &&
    context.cartItems.reduce((count, curItem) => {
      return (
        count +
        parseInt(curItem.price) *
          parseInt(curItem.quantity || 0)
      );
    }, 0)



  const submitOrder = (e) => {
    e.preventDefault();
    if (!authContext.userId && !authContext.token) {
      setMessage("You need to login first");
      return;
    }
    axios
      .post("/order/add-order-info", {
        userId: authContext.userId,
        firstName,
        lastName,
        companyName,
        email,
        phone,
        country,
        address,
        city,
        postCode,
        orderNotes,
        totalPrice:   context.cartItems.itemsPrice
      })
      .then((res) => {
        if (res?.data?.message === "Order successfully added") {
          localStorage.removeItem("cart-items");
          setFirstName("");
          setLastName("");
          setCompanyName("");
          setEmail("");
          setPhone("");
          setCountry("");
          setAddress("");
          setCity("");
          setPostCode("");
          setOrderNotes("");
          setMessage(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="checkout-area ptb-50">
      <div className="container">
        {message !== "" && (
          <div
            className={`
        ${
          message === "Order successfully added"
        } ? alert alert-success : alert alert-danger 
      `}
            role="alert"
          >
            {message}
          </div>
        )}
        <form onSubmit={submitOrder}>
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="user-actions">
                <i className="bx bx-log-in"></i>
                <span>
                  Returning customer? <a href="#">Click here to login</a>
                </span>
              </div>

              <div className="user-actions-2">
                <i className="bx bx-code-alt"></i>
                <span>
                  Have a coupon? <a href="#">Click here to enter your code</a>
                </span>
              </div>

              <div className="billing-details">
                <h3 className="title">Billing Details</h3>

                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        First Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>
                        Last Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Company Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Company Name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Email Address <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Phone <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Country <span className="required">*</span>
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Address <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Town / City <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Town / City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Postcode <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Postcode"
                        value={postCode}
                        onChange={(e) => setPostCode(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="create-an-account"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="create-an-account"
                      >
                        Create an account?
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="ship-different-address"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="ship-different-address"
                      >
                        Ship to a different address?
                      </label>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <textarea
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        name="notes"
                        id="notes"
                        cols="30"
                        rows="5"
                        placeholder="Order Notes"
                        className="form-control"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="order-details">
                <div className="cart-totals">
                  <h3>Cart Totals</h3>

                  <ul>
                    <li>
                      Subtotal{" "}
                      <span>
                        $
                        {context.cartItems &&
                          context.cartItems.reduce((count, curItem) => {
                            return (
                              count +
                              parseInt(curItem.price) *
                                parseInt(curItem.quantity || 0)
                            );
                          }, 0)}
                      </span>
                    </li>
                    <li>
                      Shipping <span>$30.00</span>
                    </li>
                    <li>
                      Total{" "}
                      <span>
                        $
                        {context.cartItems &&
                          context.cartItems.reduce((count, curItem) => {
                            return (
                              count +
                              parseInt(curItem.price) *
                                parseInt(curItem.quantity || 0)
                            );
                          }, 0) + 30}
                      </span>
                    </li>
                    <li>
                      Payable Total{" "}
                      <span>
                        $
                        {context.cartItems &&
                          context.cartItems.reduce((count, curItem) => {
                            return (
                              count +
                              parseInt(curItem.price) *
                                parseInt(curItem.quantity || 0)
                            );
                          }, 0) + 30}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="payment-box">
                  <h3 className="title">Payment Method</h3>

                  <div className="payment-method">
                    <p>
                      <input
                        type="radio"
                        id="cash-on-delivery"
                        name="radio-group"
                        checked
                      />
                      <label htmlFor="cash-on-delivery">Cash on Delivery</label>
                    </p>
                    <p>
                      <input
                        type="radio"
                        id="check-payments"
                        name="radio-group"
                      />
                      <label htmlFor="check-payments">Check Payments</label>
                    </p>
                    <p>
                      <input type="radio" id="paypal" name="radio-group" />
                      <label htmlFor="paypal">PayPal</label>
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="default-btn"
                    style={{ cursor: "pointer" }}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CheckoutArea;
