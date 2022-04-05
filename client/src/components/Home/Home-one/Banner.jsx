import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import {Link} from 'react-router-dom';

import headphone from "../../../assets/img/main-slider/headphone.png";
import monitor from "../../../assets/img/main-slider/monitor.png";
import drone from "../../../assets/img/main-slider/drone.png";

const Banner = () => {
  return (
    <OwlCarousel
      className="owl-theme"
      items={1}
      loop
      dots={false}
      nav={true}
      navText={[
        "<i class='flaticon-left-arrow'/>",
        "<i class='flaticon-right-arrow' />",
      ]}
    >
      <div className="main-slider-item">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="main-slider-content">
                    <b>Big Sale Offer</b>
                    <h1>The Drone has an Attractive Gift Free</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>

                    <div className="slider-btn">
                    <Link to="/shop" className="default-btn">
                        <i className="flaticon-shopping-cart"></i>
                        Shop Now
                        <span></span>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="main-slider-image">
                    <img src={drone} alt="image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-slider-item">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="main-slider-content">
                    <b>Big Sale Offer</b>
                    <h1>The High-Quality Product is Ready</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>

                    <div className="slider-btn">
                    <Link to="/shop" className="default-btn">
                        <i className="flaticon-shopping-cart"></i>
                        Shop Now
                        <span></span>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="main-slider-image">
                    <img src={headphone} alt="image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-slider-item">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="main-slider-content">
                    <b>Big Sale Offer</b>
                    <h1>Get The Best Deal on Smart TV</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>

                    <div className="slider-btn">
                    <Link to="/shop" className="default-btn">
                        <i className="flaticon-shopping-cart"></i>
                        Shop Now
                        <span></span>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="main-slider-image">
                    <img src={monitor} alt="image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OwlCarousel>
  );
};

export default Banner;
