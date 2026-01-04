import express from 'express';
const router = express.Router();

import MeController from '../app/controllers/MeController.js';

router.get('/stored/courses', MeController.storedCourses);
router.get('/trash/courses', MeController.trashCourses);

export default router;
