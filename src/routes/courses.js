import express from 'express';
const router = express.Router();

import coursesController from '../app/controllers/CourseController.js';

router.post('/handle-form-action', coursesController.handleFormAction);
router.get('/create', coursesController.create);
router.post('/store', coursesController.store);
router.get('/:id/edit', coursesController.edit);
router.put('/:id', coursesController.update);
router.delete('/:id', coursesController.delete);
router.delete('/:id/force', coursesController.forceDelete);
router.get('/:slug', coursesController.show);
router.patch('/:id/restore', coursesController.restore);
export default router;
