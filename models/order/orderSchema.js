const mongodb = require('mongoose');
const orderSchema = mongodb.Schema({
    shipping: 
        {
          fullName: {type: String, required: true},  
          address: {type: String, required: true},  
          postalCode: {type: String, required: true},  
          city: {type: String, required: true},  
        },
    orderItems: [
        {
            name: {type: String, required: true}, 
            image: {type: String, required: true}, 
            price: {type: Number, required: true}, 
            quantity: {type: Number, required: true}, 
            product: {
                type: mongodb.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
        }
    ],
    totalQty: {type: Number, required: true},
    totalPrice: {type: Number, required: true},
    user: {
        type: mongodb.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    payment: {type: String},
    isPaid: {type: Boolean, default: false}, 
    isDone: {type: Boolean, default: false},
    created: {type: Date, default: Date.now},
    modified: {type: Date, default: Date.now},
});

module.exports = mongodb.model('order', orderSchema);