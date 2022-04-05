import cart1 from "../../assets/img/cart/cart-1.png";
import cart2 from "../../assets/img/cart/cart-2.png";
import cart3 from "../../assets/img/cart/cart-3.png";
import cart4 from "../../assets/img/cart/cart-4.png";
import cart5 from "../../assets/img/cart/cart-5.png";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

function WishListArea() {
  const [userInfo, setUser] = useState([]);
  const [userId, setUserId] = useState("624b555e02cd4d5308819f99");

  const RemoveFromWishList = async (prodId,userId) => await axios.put(`http://127.0.0.1:5000/products/wishListDel/${prodId}/624b555e02cd4d5308819f99`)


  useEffect(() => {
    axios
      .get(`/products/wishList/${userId}`)
      .then((res) => {
        setUser(res.data.wishlist);
        console.log(res.data.wishlist)
        console.log(userInfo)
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <section className="wishlist-area ptb-50">
      <div className="container">
        <div className="wishlist-table table-responsive">
          <div className="wishlist-title">
            <h2>My Wishlist</h2>
          </div>

          <table className="table table-bordered">
            <tbody>
              {userInfo &&
                userInfo.map((product) => 
                  <tr>
                    <td className="product-remove">
                      <a   className="remove" onClick={()=>{RemoveFromWishList(product._id,"623b4abf641c0826743174ae")}} >
                        <i className="bx bx-x"></i>
                      </a>
                    </td>

                    <td className="product-thumbnail">
                      <a href="#">
                        <img src={product.image} alt="item" />
                      </a>
                    </td>

                    <td className="product-name">
                      <Link to={`/products-details/${product._id}`}>
                        {product.name}
                      </Link>
                    </td>

                    <td className="product-price">
                      <span className="unit-amount">{product.price}</span>
                    </td>

                    <td className="product-stock">
                     {product.total_in_stock!=0 ? <span className="stock">In Stock</span> : <div></div>}
                    </td>

                    <td className="product-btn">
                      <a href="#" className="default-btn">
                        <i className="flaticon-shopping-cart"></i>
                        Add to Cart
                        <span></span>
                      </a>
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default WishListArea;
