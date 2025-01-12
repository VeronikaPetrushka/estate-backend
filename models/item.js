import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: /^[A-Za-z0-9\s\-_,\.;:()]+$/
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Купити", "Орендувати", "Комерційне"]
    },
    subCategory: {
        type: String,
        required: false,
        default: null,
        enum: ["Будинки", "Квартири", "Купити", "Орендувати"]
    },
    location: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: false,
        default: null,
    },
    description: {
        type: String,
        required: false,
        default: null,
    },
    // images: {
    //     type: String,
    //     embedded: true,
    //     required: false,
    //     default: null
    // },
    favorite: {
        type: Boolean,
        required: false,
        default: false
    },
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model("Item", itemSchema);