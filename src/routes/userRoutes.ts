import { Router } from 'express';
import { createUser, getUser /*, updateUser, deleteUser*/ } from '../controller/userController';

const router = Router();

// GET /users/:id
router.get('/', getUser);

// POST /users
router.post('/', createUser);

// PUT /users/:id
// router.put('/:id', updateUser);

// DELETE /users/:id
// router.delete('/:id', deleteUser);

export default router;
