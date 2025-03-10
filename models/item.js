import mongoose from "mongoose";
import gravatar from 'gravatar';
import Joi from 'joi';

export const createItemSchema = Joi.object({
    name: Joi.string().pattern(/^[A-Za-z0-9\s\-_,.;:()]+$/).required(),
    price: Joi.number().positive().required(),
    currency: Joi.string().required(),
    description: Joi.string().allow(null, '').optional(),
    category: Joi.string().valid("Купити", "Орендувати", "Комерційне").required(),
    subCategory: Joi.string().valid("Будинки", "Квартири", "Купити", "Орендувати").allow(null, "").optional(),
    height: Joi.string().required(),
    floor: Joi.string().required(),
    rooms: Joi.number().positive().required(),
    city: Joi.string().required(),
    district: Joi.string().required(),
    address: Joi.string().required(),
    size: Joi.number().positive().allow(null).optional(),
    favorite: Joi.boolean().default(false).optional(),
    images: Joi.array().items(Joi.string().uri()).optional(),
});

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
    currency: {
        type: String,
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
        enum: ["Будинки", "Квартири", "Купити", "Орендувати", "", null]
    },
    rooms: {
        type: Number,
        required: true
    },
    floor: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    address: {
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
    images: {
        type: [String],
        default: []
    },    
    favorite: {
        type: Boolean,
        required: false,
        default: false
    },
}, {
    timestamps: true,
    versionKey: false
});

itemSchema.methods.setAvatarURL = async function (name) {
    this.images = await gravatar.url(name, { s: '100' });
  };

export default mongoose.model("Item", itemSchema);