const mongodb = require('mongoose');
const Order = require('./orderSchema');

exports.createOrder = (req, res) => {
    if(req.body.orderItems.length === 0){
        return res.status(400).json({
            statusCode: 400,
            status: false,
            message: 'Cart is empty'
        })
    }else {
        const newOrder = new Order({
            shipping: req.body.shipping,
            payment: req.body.payment,
            orderItems: req.body.orderItems,
            totalQty: req.body.totalQty,
            totalPrice: req.body.totalPrice,
            user: req.user.id
        })
        newOrder.save()
        .then(() => {
            res.status(201).json({
                statusCode: 201,
                status: true,
                message: 'A new order created successfully',
                order: newOrder
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                statusCode: 500,
                status: false,
                message: 'Failed to create a new order'
            })
        })
    }

}

exports.getOrders = (req, res) => {
    Order.find({user: req.user.id})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
}


exports.getOneorder = (req, res) => {
    Order.exists({_id: req.params.id}, (err, result) => {
        if(err){
            return res.status(400).json(err)
        }else {
            if(result){
                Order.findById(req.params.id)
                .then(data => res.status(200).json(data))
                .catch(err => res.status(500).json(err)) 
            }else {
                return res.status(404).json({
                    statusCode: 404,
                    status: false,
                    message: 'This order does not exist'
                })
            }
        }
    })
}


exports.updatePayment = async (req, res) => {
    Order.exists({_id: req.params.id}, (err, result) => {
        if(err){
            return res.status(400).json(err)
        } else{
            if(result){
                Order.updateOne({_id: req.params.id}, {
                    ...req.body,
                    isPaid: true,
                    payment: req.body.payment,
                    modified: Date.now()
                })
                .then(() => res.status(200).json({
                    statusCode: 200,
                    status: true,
                    message: 'The order updeted successfully',
                }))
                .catch(() => res.status(500).json({
                    statusCode: 500,
                    status: false,
                    message: 'Failed to update the order'
                }))
            } else {
                return res.status(404).json({
                    statusCode: 404,
                    status: false,
                    message: 'This order does not exist'
                })
            }
        }
    })
}


exports.getAllOrders = (req, res) => {
    Order.find()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
}


exports.updateToCompleted = async (req, res) => {
    Order.exists({_id: req.params.id}, (err, result) => {
        if(err){
            return res.status(400).json(err)
        } else{
            if(result){
                Order.updateOne({_id: req.params.id}, {
                    ...req.body,
                    isDone: true,
                    modified: Date.now()
                })
                .then(() => res.status(200).json({
                    statusCode: 200,
                    status: true,
                    message: 'The order updeted successfully',
                }))
                .catch(() => res.status(500).json({
                    statusCode: 500,
                    status: false,
                    message: 'Failed to update the order'
                }))
            } else {
                return res.status(404).json({
                    statusCode: 404,
                    status: false,
                    message: 'This order does not exist'
                })
            }
        }
    })
}