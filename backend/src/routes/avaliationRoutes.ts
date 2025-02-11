import { Router } from 'express';
import { AvaliarAcomodacao } from '../controllers/avaliation.controller';

const router = Router();

router.get('/avaliar-acomodacao/:id', AvaliarAcomodacao);

export default router;
