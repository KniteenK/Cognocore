import {Router} from 'express';

const router = Router();

import {getTasks, createTasks, deleteTasks} from '../controllers/tasks.controller.js';

router.get('/', getTasks);
router.post('/', createTasks);
router.delete('/:id', deleteTasks);

export default router;