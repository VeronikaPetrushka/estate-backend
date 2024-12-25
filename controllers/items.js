import Item from "../models/item.js"

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

// CREATE ITEM

async function createItem(req, res, next) {

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

    try {
        const result = await Item.create(item);
        res.status(201).send(result)
    } catch (error) {
        next(error)
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