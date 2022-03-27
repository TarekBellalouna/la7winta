import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Image } from "cloudinary-react";
import CartContext from "../../contexts/cart-context";

function ProductsDetailsArea() {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  const context = useContext(CartContext);

  useEffect(() => {
    axios
      .get("/products/fetch-product/" + productId)
      .then((res) => {
        setProduct(res.data.product);
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
                  <img src={product.image} width="500" alt="" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="product-content content-two">
                <h3>{product.name}</h3>

                <div className="product-review">
                  <div className="rating">
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                  </div>
                </div>

                <div className="price">
                {product.discount?  <span className="old-price">{product.price}DT</span> : ""}
                  <span className="new-price">{product.price-(product.price*product.discount)+"DT"}</span>
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
                    <a href="#" style={{ backgroundColor: product.color }}></a>
                   
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
                    className="default-btn"
                    onClick={() => addToCart(product)}
                  >
                    <i className="flaticon-shopping-cart"></i>
                    Add to cart
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

export default ProductsDetailsArea;
