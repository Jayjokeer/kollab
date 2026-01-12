import { Router } from 'express';
import {
  createIdea,
  getIdeas,
  getIdeaById
} from '../controllers/ideas.controller';

const router = Router();

router.post('/', createIdea);
router.get('/', getIdeas);
router.get('/:id', getIdeaById);

export default router;
