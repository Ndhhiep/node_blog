import express from 'express';
const router = express.Router();

import coursesController from '../app/controllers/CourseController.js';

router.get('/create', coursesController.create);
router.post('/store', coursesController.store);
router.get('/:id/edit', coursesController.edit);
router.put('/:id', coursesController.update);
router.post('/:id/delete', coursesController.delete);
router.get('/:slug', coursesController.show);

export default router;
