import path from 'path';
import fs from 'fs/promises';
import {Jimp} from 'jimp';
import crypto from 'crypto';

import Item from "../models/item.js"
import CloudinaryUploadImage from "../helpers/cloudinary.js";
import { isAccessible } from '../helpers/upload.js';
import { createItemSchema } from '../models/item.js';

const storeImage = path.join(process.cwd(), 'public', 'images');

// FULL

async function getItems(req, res, next) {

    try {
        const items = await Item.find();
        res.status(200).send(items)
    } catch (error) {
        next(error)
    }

};

// BUY

async function getItemsToBuy(req, res, next) {

    try {
        const items = await Item.find({ category: "Купити"});

        res.status(200).send(items)
    } catch (error) {
        next(error)
    }

};

async function getItemsToBuyHouse(req, res, next) {

    try {
        const items = await Item.find({ category: "Купити", subCategory: "Будинки"});

        res.status(200).send(items)
    } catch (error) {
        next(error)
    }

};

async function getItemsToBuyFlat(req, res, next) {

    try {
        const items = await Item.find({ category: "Купити", subCategory: "Квартири"});

        res.status(200).send(items)
    } catch (error) {
        next(error)
    }

};

// RENT

async function getItemsToRent(req, res, next) {

    try {
        const items = await Item.find({ category: "Орендувати"});

        res.status(200).send(items)
    } catch (error) {
        next(error)
    }

};

async function getItemsToRentHouse(req, res, next) {

    try {
        const items = await Item.find({ category: "Орендувати", subCategory: "Будинки"});

        res.status(200).send(items)
    } catch (error) {
        next(error)
    }

};

async function getItemsToRentFlat(req, res, next) {

    try {
        const items = await Item.find({ category: "Орендувати", subCategory: "Квартири"});

        res.status(200).send(items)
    } catch (error) {
        next(error)
    }

};

// COMMERCIAL

async function getItemsCommercial(req, res, next) {

    try {
        const items = await Item.find({ category: "Комерційне"});

        res.status(200).send(items)
    } catch (error) {
        next(error)
    }

};

async function getItemsToBuyCommercial(req, res, next) {

    try {
        const items = await Item.find({ category: "Комерційне", subCategory: "Купити"});

        res.status(200).send(items)
    } catch (error) {
        next(error)
    }

};

async function getItemsToRentCommercial(req, res, next) {

    try {
        const items = await Item.find({ category: "Комерційне", subCategory: "Орендувати"});

        res.status(200).send(items)
    } catch (error) {
        next(error)
    }

};

// SINGLE ITEM

async function getItem(req, res, next) {
    const { id } = req.params;

    try {
        const item = await Item.findById(id);

        if(item === null) {
            return res.status(404).send({ message: 'Item is not found'})
        }

        res.status(200).send(item)
    } catch (error) {
        next(error)
    }

};

// FAVORITES

async function getItemsFavorite(req, res, next) {

    try {
        const items = await Item.find({ favorite: true});

        res.status(200).send(items)
    } catch (error) {
        next(error)
    }

};

// UPLOAD IMAGE

// const uploadImages = async (req, res, next) => {
//     const { id } = req.params;
//     console.log('Uploaded Files:', req.files);
//     console.log('Request Body:', req.body);

//     if (!id) {
//         return res.status(400).json({ message: 'ID is required' });
//     }

//     try {
//         const imageUrls = [];

//         for (const file of req.files) {
//             const { path: tempUpload, originalname } = file;
//             const extension = path.extname(originalname);
//             const filename = `${id}-${crypto.randomUUID()}${extension}`;
//             const resultUpload = path.join('tmp', filename);

//             await fs.rename(tempUpload, resultUpload);

//             await Jimp.read(resultUpload)
//             .then(image => {
//                 image.cover(100, 100)
//                     .quality(75)
//                     .write(resultUpload);
//             })
//             .catch(err => {
//                 console.error('Image processing error:', err);
//                 fs.rm(resultUpload).catch(() => {});
//                 next(err);
//             });

//             const imageUrl = await CloudinaryUploadImage(resultUpload);
//             imageUrls.push(imageUrl);

//             await fs.rm(resultUpload);
//         }

//         console.log('Image URLs:', imageUrls);

//         const data = await Item.findByIdAndUpdate(id, { images: imageUrls }, { new: true });
//         if (!data) {
//             return res.status(404).json({ message: 'Item not found' });
//         }

//         return res.json({ images: imageUrls });

//     } catch (error) {
//         console.error('Error uploading images:', error);

//         for (const file of req.files) {
//             const filePath = file.path;
//             if (await isAccessible(filePath)) {
//                 await fs.rm(filePath);
//             }
//         }

//         next(error);
//     }
// };

// CREATE ITEM

const createItem = async (req, res, next) => {
    try {
        const { error, value } = createItemSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ error: 'Validation Error', details: error.details });
        }

        let imageUrls = [];

        if (req.files && req.files.length > 0) {
            try {
                for (const file of req.files) {
                    const { path: tempPath, originalname } = file;
                    const extension = path.extname(originalname);
                    const filename = `${crypto.randomUUID()}${extension}`;
                    const resultUpload = path.join('tmp', filename);

                    await fs.rename(tempPath, resultUpload);

                    // await Jimp.read(resultUpload)
                    //     .then(image => {
                    //         image.cover(100, 100)
                    //             .quality(75)
                    //             .write(resultUpload);
                    //     })
                    //     .catch(err => {
                    //         console.error('Image processing error:', err);
                    //         fs.rm(resultUpload).catch(() => {});
                    //         throw new Error('Image processing failed');
                    //     });

                    const imageUrl = await CloudinaryUploadImage(resultUpload);
                    imageUrls.push(imageUrl);

                    await fs.rm(resultUpload);
                }
            } catch (uploadError) {
                console.error('Image upload failed:', uploadError);
                return res.status(500).json({ error: 'Failed to upload images', details: uploadError.message });
            }
        }

        const itemData = { ...value, images: imageUrls };

        const newItem = await Item.create(itemData);

        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

// UPDATE ITEM

async function updateItem(req, res, next) {

    try {
        const { id } = req.params;

        const item = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            subCategory: req.body.subCategory,
            location: req.body.location,
            size: req.body.size,
            favorite: req.body.favorite,
            // image: req.file.filename
        }    

        const result = await Item.findByIdAndUpdate(id, item, {new: true});

        if(result === null) {
            return res.status(404).send({ message: 'Item is not found'})
        }

        res.status(200).send(result)
    } catch (error) {
        next(error)
    }

};

// DELETE ITEM

async function deleteItem(req, res, next) {
    const { id } = req.params;

    try {
        const result = await Item.findByIdAndDelete(id);

        if(result === null) {
            return res.status(404).send({ message: 'Item is not found'})
        }

        res.status(204).end()
    } catch (error) {
        next(error)
    }
};

export default { getItems, getItemsToBuy, getItemsToBuyHouse, getItemsToBuyFlat, getItemsToRentHouse, getItemsToRentFlat, getItemsToBuyCommercial, getItemsToRentCommercial, getItemsToRent, getItemsCommercial, getItemsFavorite, getItem, createItem, updateItem, deleteItem };