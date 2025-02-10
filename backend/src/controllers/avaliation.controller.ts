import Database from '../database';
import { Request, Response } from 'express';
import RoomRepository from '../repositories/room.repository';
import ReservationRepository from '../repositories/reservation.repository';
import { addDays, parseISO } from 'date-fns';
import RoomService from '../services/room.service';
import FilterService from '../services/filter.service';
import AvaliationService from '../services/avaliation.service';

export const AvaliarAcomodacao = async (req: Request, res: Response) => {
    const { num_estrelas, comentario } = req.query;
  
    const estrelas = Number(num_estrelas);
  
    if (!num_estrelas || isNaN(estrelas) || estrelas < 1 || estrelas > 5) {
      return res.status(400).json({ error: 'A nota deve ser um número entre 1 e 5.' });
    }
    
    res.json({ message: 'Avaliação registrada com sucesso!', estrelas, comentario });
  };



