import { Router } from 'express';
import { AvaliarAcomodacao } from '../controllers/avaliation.controller';
import Database from '../database';

const router = Router();

router.get('/avaliar-acomodacao/:id', AvaliarAcomodacao);
router.get('/database', (rec,res)=>{console.log(Database.getInstance())})

export default router;
