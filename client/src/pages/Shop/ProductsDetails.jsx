import NewArrivals from "../../components/Common/NewArrivals";
import PageTitle from "../../components/Common/PageTitle";
import Support from "../../components/Common/Support";
import Footer from "../../components/Footer/Footer";
import ProductsDetailsArea from "../../components/Shop/ProductsDetailsArea";

function ProductsDetails() {
  return (
    <div className="products-details-wrapper">
      <PageTitle title="Products Details" />
      <ProductsDetailsArea />
      <NewArrivals paddingClass=" pt-50 pb-20" title="Related Products" />
      <Support />
      <Footer />
    </div>
  );
}

export default ProductsDetails;
