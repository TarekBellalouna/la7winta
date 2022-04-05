const router = require("express").Router();
const stripe = require("stripe")("sk_test_51KhtEeEH3igSvawdRNwDV7B9bnckETqEhDd7hJ5uneLPgHf9axDBL4dnMnBYV7HEUhq6SSzsQ05uNAWmyLIudmHy00xN7cHnI0");

router.post("/payment", (req, res) => {
  console.log("payment back")
  console.log(req)
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
        console.log("payment succeeded!")
      }
    }
  );
});

module.exports = router;
