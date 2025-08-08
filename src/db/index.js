const mongoose = require("mongoose");

async function dbConnection() {
    const dbURL = process.env.DBURL;

    try {
        const connection = await mongoose.connect(dbURL);
        console.log("connection with database is successfull");

    } catch (error) {
        throw error;
    }
}

// product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    }, 
    rating: {
        type: Number,
        default: 0,
        required: true
    }
})

// Category Schema 
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
    }
})

// model creation
const Product = mongoose.model('Product', productSchema);
const Category = mongoose.model('Category', categorySchema);


module.exports = {
    Product, Category, dbConnection
}