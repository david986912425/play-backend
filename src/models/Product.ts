import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const productSchema = new mongoose.Schema({
    uuid: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    name: { type: String, required: true },
    description: String,
    image: String,
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
