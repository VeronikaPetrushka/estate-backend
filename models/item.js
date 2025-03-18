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
    plotCategory: Joi.string().valid("Cільськогосподарське призначення", "Житлова та громадська забудова", "Природно-заповіднє та інше природоохоронне призначення", "Оздоровче призначення", "Рекреаційне призначення", " Історико-культурне призначення", "Лісогосподарське призначення", "Водний фонд", "Промисловость, транспорт, звʼязок, енергетика, оборона та інше призначення").allow(null, "").optional(),
    height: Joi.string().optional(),
    floor: Joi.string().optional(),
    rooms: Joi.number().positive().optional(),
    city: Joi.string().optional(),
    district: Joi.string().optional(),
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
        enum: ["Купити", "Орендувати", "Комерційне", "Земельна ділянка"]
    },
    subCategory: {
        type: String,
        required: false,
        default: null,
        enum: ["Будинки", "Квартири", "Купити", "Орендувати", "Земельна ділянка", "", null]
    },
    plotCategory: {
        type: String,
        required: false,
        default: null,
        enum: ["Cільськогосподарське призначення", "Житлова та громадська забудова", "Природно-заповіднє та інше природоохоронне призначення", "Оздоровче призначення", "Рекреаційне призначення", " Історико-культурне призначення", "Лісогосподарське призначення", "Водний фонд", "Промисловость, транспорт, звʼязок, енергетика, оборона та інше призначення", "", null]
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