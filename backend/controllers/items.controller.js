import {
  getAllItems,
  createItemModel,
  updateItemModel,
  deleteItemModel
} from '../models/items.model.js';

export const getItems = async (req, res) => {
  try {
    const items = await getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createItem = async (req, res) => {
  try {
    const newItem = await createItemModel(req.body);
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    await updateItemModel(req.params.id, req.body);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    await deleteItemModel(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};