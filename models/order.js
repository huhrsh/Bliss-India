const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [{
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        default: 1
    }
}],
totalAmount: {
  type: Number,
  required: true,
},
}, {
  timestamps: true, 
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
