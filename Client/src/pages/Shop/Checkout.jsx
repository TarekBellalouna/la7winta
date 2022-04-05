import PageTitle from "../../components/Common/PageTitle";
import Footer from "../../components/Footer/Footer";
import CheckoutArea from "../../components/Shop/CheckoutArea";

function Checkout() {
  return (
    <div className="checkout-wrapper">
      <PageTitle title="Checkout" />
      <CheckoutArea />
      <Footer />
    </div>
  );
}

export default Checkout;
