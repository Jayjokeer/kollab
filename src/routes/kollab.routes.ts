import { Router } from 'express';
import {
  createKollab,
  getKollabWithDiscussions,
  addDiscussion
} from '../controllers/kollab.controller';

const router = Router();

router.post('/', createKollab);
router.get('/:id', getKollabWithDiscussions);
router.post('/:id/discussions', addDiscussion);

export default router;
