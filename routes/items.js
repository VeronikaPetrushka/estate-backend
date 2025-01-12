import express from "express";
import ItemsController from '../controllers/items.js';
// import { uploadImages } from '../middleware/images.js'

const router = express.Router();
const jsonParser = express.json();

router.get('/', ItemsController.getItems);
router.get('/buy', ItemsController.getItemsToBuy);
router.get('/buy/houses', ItemsController.getItemsToBuyHouse);
router.get('/buy/flats', ItemsController.getItemsToBuyFlat);
router.get('/rent', ItemsController.getItemsToRent);
router.get('/rent/houses', ItemsController.getItemsToRentHouse);
router.get('/rent/flats', ItemsController.getItemsToRentFlat);
router.get('/commercial', ItemsController.getItemsCommercial);
router.get('/commercial/buy', ItemsController.getItemsToBuyCommercial);
router.get('/commercial/rent', ItemsController.getItemsToRentCommercial);
router.get('/favorite', ItemsController.getItemsFavorite);
router.get('/:id', ItemsController.getItem);
router.post('/', jsonParser, ItemsController.createItem);
router.put('/:id', jsonParser, ItemsController.updateItem);
router.delete('/:id', ItemsController.deleteItem);

export default router;

