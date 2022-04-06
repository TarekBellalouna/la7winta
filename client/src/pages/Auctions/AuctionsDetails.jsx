import AuctionsDetailsArea from "../../components/Auction/AuctionsDetailsArea";
import NewArrivals from "../../components/Common/NewArrivals";
import PageTitle from "../../components/Common/PageTitle";
import Support from "../../components/Common/Support";
import Footer from "../../components/Footer/Footer";

function AuctionsDetails() {
  return (
    <div className="products-details-wrapper">
      <PageTitle title="Auction Room" />
      <AuctionsDetailsArea />
      <NewArrivals paddingClass=" pt-50 pb-20" title="Related Products" />
      <Support />
      <Footer />
    </div>
  );
}

export default AuctionsDetails;
