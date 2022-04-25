import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/auth-context";
import PageTitle from "../../components/Common/PageTitle";
import AuctionArea from "../../components/Auction/AuctionsArea";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import { useHistory, useParams } from "react-router-dom";

function Auctions() {
  const [auction, setAuction] = useState([]);
  const context = useContext(AuthContext);


  
  

  const editAuction = (
    auctionId,
    productName,
    description,
    catergory,
    Price,
    duration,
    currentPrice,
    prod_image_public_id
  ) => {
    const formData = new FormData();
    formData.append("auction_id", auctionId);
    formData.append("productName", productName);
    formData.append("description", description);

    formData.append("catergory", catergory);
    formData.append("Price", Price);
    formData.append("duration", duration);
    formData.append("currentPrice", currentPrice);
    formData.append("image_public_id", prod_image_public_id);
    formData.append("upload_preset", "econix");

    axios
      .post("/auction/edit-auction", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.message === "Auction edited") {
          return axios.get("/auction/").then((res) => {
            setAuction(res.data.auctions);
          });
        }
      })
      .catch((err) => console.log(err));
  };

  let history = useHistory();


 

  return (
    <div className="products-wrap">
      <PageTitle title="Auctions" />
      <AuctionArea
        auction={auction}
        editAuction={editAuction}

      />
      <Footer />
    </div>
  );
}

export default Auctions;
