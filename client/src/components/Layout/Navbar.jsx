import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useHistory } from "react-router-dom";

import logo2 from "../../assets/img/logo-2.png";
import AuthContext from "../../contexts/auth-context";

const homeRoutes = ["/", "/home-two", "/home-three", "/home-four"];
const pagesRoutes = [
  "/about",
  "/our-team",
  "/pricing-plans",
  "/search",
  "/contact",
  "/faqs",
  "/login",
  "/register",
  "/my-account",
  "/error-404",
  "/tracking-order",
  "/compare",
  "/terms-of-service",
  "/privacy-policy",
];
const shopRoutes = [
  "/shop",
  "/shop-list-view",
  "/shop-left-sidebar",
  "/shop-right-sidebar",
  "/shop-full-width",
  "/cart",
  "/wishlist",
  "/checkout",
  "/products-details",
  "/products-details-sidebar",
];
const blogRoutes = [
  "/blog",
  "/blog-list-view",
  "/blog-left-sidebar",
  "/blog-right-sidebar",
  "/blog-full-width",
  "/blog-details",
];
const productsRoutes = ["/products", "/add-product"];

function Navbar() {
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();
  const context = useContext(AuthContext);
  const history = useHistory();
  const [active, setActive] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (context && context.userId) {
      axios
        .get(`/user/${context.userId}`)
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [context]);

  const toggleHotline = () => {
    setActive(!active);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    if (currentScrollPos > 90) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible, handleScroll]);

  const handleLogout = () => {
    context.logout();
    history.push("/login");
  };

  return (
    <div className={`navbar-area ${visible ? "is-sticky sticky-active" : ""}`}>
      <div className={showMenu ? "main-navbar show" : "main-navbar"}>
        <div className="container">
          <nav className="navbar navbar-expand-md navbar-light">
            <div className={"navbar-category"}>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                  <li className="nav-item respo-nav">
                    <a href="#" className="nav-link">
                      <i className="bx bx-menu"></i>
                      All Categories
                    </a>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link to="/shop/camera" className="nav-link">
                          <i className="flaticon-camera"></i>
                          Cameras
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/shop/speaker" className="nav-link">
                          <i className="flaticon-stereo"></i>
                          Audio
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/shop/tv" className="nav-link">
                          <i className="flaticon-tv-box"></i>
                          TV
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/shop/phone" className="nav-link">
                          <i className="flaticon-smartphone"></i>
                          Mobiles
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/shop/headphone" className="nav-link">
                          <i className="flaticon-headphones"></i>
                          Headphone
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/shop/watch" className="nav-link">
                          <i className="flaticon-smart-watch"></i>
                          Watches
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/shop/computer" className="nav-link">
                          <i className="flaticon-desktop-computer"></i>
                          Computers
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/shop/computer" className="nav-link">
                          <i className="flaticon-laptop"></i>
                          Laptop
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/shop/battery" className="nav-link">
                          <i className="flaticon-battery-charge"></i>
                          Battery
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/shop/accesories" className="nav-link">
                          <i className="flaticon-trimmer"></i>
                          Accessories
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div className="collapse navbar-collapse mean-menu">
              <ul className="navbar-nav responsive-menu">
                <li className="nav-item">
                  <NavLink
                    to={"/"}
                    isActive={() => homeRoutes.includes(pathname)}
                    className="nav-link"
                  >
                    Home <i className="bx bx-chevron-down chevron-display"></i>
                    <span className="plus_icon">+</span>
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <NavLink to={"/"} className="nav-link">
                        Home
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to={"/home-two"} className="nav-link">
                        Home Two
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to={"/home-three"} className="nav-link">
                        Home Three
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to={"/home-four"} className="nav-link">
                        Home Four
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li className="nav-item megamenu">
                  <NavLink
                    to="/about"
                    isActive={() => pagesRoutes.includes(pathname)}
                    className="nav-link"
                  >
                    Pages <i className="bx bx-chevron-down chevron-display"></i>
                    <span className="plus_icon">+</span>
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <div className="container">
                        <div className="row">
                          <div className="col">
                            <ul className="megamenu-submenu">
                              <li>
                                <NavLink to={"/about"} className="nav-link">
                                  About Us
                                </NavLink>
                              </li>

                              <li>
                                <NavLink to={"/our-team"} className="nav-link">
                                  Our Team
                                </NavLink>
                              </li>

                              <li>
                                <NavLink
                                  to={"/pricing-plans"}
                                  className="nav-link"
                                >
                                  Pricing Plans
                                </NavLink>
                              </li>

                              <li>
                                <NavLink to={"/search"} className="nav-link">
                                  Search
                                </NavLink>
                              </li>

                              <li>
                                <NavLink to={"/contact"} className="nav-link">
                                  Contact Us
                                </NavLink>
                              </li>
                            </ul>
                          </div>

                          <div className="col">
                            <ul className="megamenu-submenu">
                              <li>
                                <NavLink to={"/faqs"} className="nav-link">
                                  FAQ's
                                </NavLink>
                              </li>
                              {!context.token && (
                                <div>
                                  <li>
                                    <NavLink to="/login" className="nav-link">
                                      Login
                                    </NavLink>
                                  </li>

                                  <li>
                                    <NavLink
                                      to="/register"
                                      className="nav-link"
                                    >
                                      Register
                                    </NavLink>
                                  </li>
                                </div>
                              )}

                              <li>
                                <NavLink to="/my-account" className="nav-link">
                                  My Account
                                </NavLink>
                              </li>

                              <li>
                                <NavLink to="/error-404" className="nav-link">
                                  404 Error
                                </NavLink>
                              </li>
                            </ul>
                          </div>

                          <div className="col">
                            <ul className="megamenu-submenu">
                              <li>
                                <NavLink
                                  to="/tracking-order"
                                  className="nav-link"
                                >
                                  Tracking Order
                                </NavLink>
                              </li>

                              <li>
                                <NavLink to="/compare" className="nav-link">
                                  Compare
                                </NavLink>
                              </li>

                              <li>
                                <NavLink
                                  to="/terms-of-service"
                                  className="nav-link"
                                >
                                  Terms Of Service
                                </NavLink>
                              </li>

                              <li>
                                <NavLink
                                  to="/privacy-policy"
                                  className="nav-link"
                                >
                                  Privacy Policy
                                </NavLink>
                              </li>

                              <li>
                                <NavLink to="/coming-soon" className="nav-link">
                                  Coming Soon
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/shop"
                    isActive={() => shopRoutes.includes(pathname)}
                    className="nav-link"
                  >
                    Shop <i className="bx bx-chevron-down chevron-display"></i>
                    <span className="plus_icon">+</span>
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <NavLink to="/shop" className="nav-link">
                        Shop
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/shop-list-view" className="nav-link">
                        Shop List View
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/shop-left-sidebar" className="nav-link">
                        Shop Left Sidebar
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/shop-right-sidebar" className="nav-link">
                        Shop Right Sidebar
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/shop-full-width" className="nav-link">
                        Shop Full Width
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/cart" className="nav-link">
                        Cart
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/wishlist" className="nav-link">
                        Wishlist
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/checkout" className="nav-link">
                        Checkout
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/blog"
                    isActive={() => blogRoutes.includes(pathname)}
                    className="nav-link"
                  >
                    Blog <i className="bx bx-chevron-down chevron-display"></i>
                    <span className="plus_icon">+</span>
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li className="nav-item">
                      <NavLink to="/blog" className="nav-link">
                        Blog
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/blog-list-view" className="nav-link">
                        Blog List View
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/blog-left-sidebar" className="nav-link">
                        Blog Left Sidebar
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/blog-right-sidebar" className="nav-link">
                        Blog Right Sidebar
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/blog-full-width" className="nav-link">
                        Blog Full Width
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink to="/blog-details" className="nav-link">
                        Blog Details
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <NavLink to="/contact" className="nav-link">
                    Contact
                  </NavLink>
                </li>

                {context.token && (
                  <>
                    {/* <li className="nav-item">
                      <NavLink
                        to="/products"
                        isActive={() => productsRoutes.includes(pathname)}
                        className="nav-link"
                      >
                        Products <i className="bx bx-chevron-down chevron-display"></i>
                        <span className="plus_icon">+</span>
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <NavLink to="/products" className="nav-link">
                            Products
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink to="/add-product" className="nav-link">
                            Add Product
                          </NavLink>
                        </li>
                      </ul>
                    </li> */}
                    <li className="nav-item">
                      <NavLink
                        to="/profile"
                        // isActive={() => shopRoutes.includes(pathname)}
                        className="nav-link"
                      >
                        {user && <i class="bx bxs-user"></i>}{" "}
                        <i className="bx bx-chevron-down chevron-display"></i>
                        <span className="plus_icon">+</span>
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <NavLink to="/profile" className="nav-link">
                            {user && user.name}
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink to="/products" className="nav-link">
                            Products
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink to="/add-product" className="nav-link">
                            Add Product
                          </NavLink>
                        </li>

                        <li className="nav-item">
                          <NavLink to="/cart" className="nav-link">
                            Cart
                          </NavLink>
                        </li>

                        <li className="nav-item">
                          <NavLink to="/order" className="nav-link">
                            Order
                          </NavLink>
                        </li>

                        <li className="nav-item">
                          <NavLink to="/wishlist" className="nav-link">
                            Wishlist
                          </NavLink>
                        </li>

                        <hr />

                        <li className="nav-item">
                          <button
                            onClick={handleLogout}
                            className="nav-logout-btn"
                          >
                            Logout
                          </button>
                        </li>
                        <li className="nav-item">
                          <NavLink to="/reset" className="nav-link">
                            Reset password
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  </>
                )}
              </ul>

              <div className="others-option d-flex align-items-center">
                <div className="option-item  respo-nav">
                  <span>
                    Hotline:
                    <a href="tel:16545676789">(+1) 654 567 – 6789</a>
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className="others-option-for-responsive">
        <div className="container">
          <div className="responsive-logo">
            <span>Econix</span>
          </div>
          <div className="dot-menu" onClick={() => toggleHotline()}>
            <div className="inner">
              <div className="circle circle-one"></div>
              <div className="circle circle-two"></div>
              <div className="circle circle-three"></div>
            </div>
          </div>

          <div className="hamburger-menu" onClick={() => toggleMenu()}>
            {showMenu ? (
              <span className="x-icon">x</span>
            ) : (
              <i className="bx bx-menu"></i>
            )}
          </div>

          <div className={active ? "active container" : "container"}>
            <div className="option-inner">
              <div className="others-option d-flex align-items-center">
                <div className="option-item">
                  <span>
                    Hotline:
                    <a href="tel:16545676789">(+1) 654 567 – 6789</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
