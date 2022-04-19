const Order = require("../models/Order");
const { validateOrder } = require("../utils/validators");

exports.addOrderInfo = async (req, res) => {

  try {
    const {
      userId,
      firstName,
      lastName,
      companyName,
      email,
      phone,
      country,
      address,
      city,
      postCode,
      orderNotes,
      totalPrice
    } = req.body;

    const { valid, errors } = validateOrder(
      firstName,
      lastName,
      email,
      phone,
      country,
      address,
      city,
      postCode
    );

    if (!valid) {
      return res.status(422).json({
        errors,
      });
    }

    const order = new Order({
      userId,
      user_first_name: firstName,
      user_last_name: lastName,
      company_name: companyName,
      user_email: email,
      user_phone: phone,
      user_country: country,
      user_address: address,
      user_city: city,
      user_postcode: postCode,
      user_order_notes: orderNotes,
      totalPrice
    });
    await order.save();
    res.status(200).json({
      message: "Order successfully added",
    });
  } catch (err) {
    res.status(500);
  }
};

exports.fetchOrders = async (req,res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name");
    res.json(orders);
  } catch (err) {
    res.status(500);
  }
};


exports.updateOrderToDelivered = async (req, res) => {

  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
}