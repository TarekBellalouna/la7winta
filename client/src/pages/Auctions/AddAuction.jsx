import React from "react";
import PageTitle from "../../components/Common/PageTitle";
import AddAuctionArea from "../../components/Auction/AddAuctionArea";

function AddAuction() {
  return (
    <div className="add-product-wrapper">
      <PageTitle title="Add Auction" />
      <AddAuctionArea />
    </div>
  );
}

export default AddAuction;
  