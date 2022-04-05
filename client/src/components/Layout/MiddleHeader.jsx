import { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";

import CartContext from "../../contexts/cart-context";
import AuthContext from "../../contexts/auth-context";
import logo from "../../assets/img/logo.png";
import "./MiddleHeader.scss";

function MiddleHeader({ history }) {
  const context = useContext(CartContext);
  const Aucontext = useContext(AuthContext);
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/shop/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <div className="middle-header-area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-3">
            <div className="middle-header-logo">
              <Link to="/">
                <img src={logo} alt="image" />
              </Link>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="middle-header-search">
              <form onSubmit={submitHandler}>
                <div className="row align-items-center">
                  <div className="col-md-4 select-column">
                    <div className="form-group">
                      <select className="form-control list">
                        <option>All Category</option> 
                        <option value="1">Computers</option>
                        <option value="2">Audio</option>
                        <option value="2">Home Theater</option>
                        <option value="3">Laptop</option>
                        <option value="3">TV</option>
                        <option value="3">Mobiles</option>
                        <option value="3">Tablets</option>
                        <option value="3">Headphone</option>
                        <option value="3">Earphone</option>
                        <option value="3">Battery</option>
                        <option value="3">Watches</option>
                        <option value="3">Cameras</option>
                        <option value="3">Accessories</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-8">
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search product..."
                        name="q"
                        onChange={(e) => setKeyword(e.target.value)}
                      />
                      <button type="submit">
                        <i className="bx bx-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-3">
            <ul className="middle-header-optional">
              {Aucontext.token &&
                <li>
                  <Link to="/wishlist">
                    <i className="flaticon-heart"></i>
                  </Link>
                </li> 
              }
              <li>
                <Link to="/cart">
                  <i className="flaticon-shopping-cart"></i>
                  {context.cartItems && context.cartItems.length > 0 && (
                    <span>{context.cartItems.length}</span>
                  )}
                </Link>
              </li>
              <li>
                $
                {context.cartItems &&
                  context.cartItems.reduce((count, curItem) => {
                    return (
                      count +
                      parseInt(curItem.price) * parseInt(curItem.quantity || 0)
                    );
                  }, 0)}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(MiddleHeader);
