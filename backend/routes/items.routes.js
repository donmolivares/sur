import { Router } from 'express';
import {
  getItems,
  createItem,
  updateItem,
  deleteItem
} from '../controllers/items.controller.js';

const router = Router();

router.get('/', getItems);        // ← antes era '/items'
router.post('/', createItem);     // ← antes era '/items'
router.put('/:id', updateItem);   // ← antes era '/items/:id'
router.delete('/:id', deleteItem);// ← antes era '/items/:id'

export default router;