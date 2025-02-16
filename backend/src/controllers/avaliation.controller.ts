import Database from '../database';
import { Request, Response } from 'express';
import RoomRepository from '../repositories/room.repository';
import ReservationRepository from '../repositories/reservation.repository';
import { addDays, parseISO } from 'date-fns';
import RoomService from '../services/room.service';
import FilterService from '../services/filter.service';
import AvaliationService from '../services/avaliation.service';

export const AvaliarAcomodacao = async (req: Request, res: Response) => {
  const { id } = req.query;
  const { num_estrelas, comentario } = req.body;

  const estrelas = Number(num_estrelas);
  const id_reserva = String(id);
  const comentario_ =String(comentario);
  
  // Verificar se o comentário tem mais de 500 caracteres
  if (comentario && comentario.length > 500) {
    return res.status(400).json({ error: 'O comentário não pode ter mais de 500 caracteres.' });
  }
  // Verificação das estrelas
  if (!num_estrelas || isNaN(estrelas) || estrelas < 1 || estrelas > 5) {
    return res.status(400).json({ error: 'A nota deve ser um número entre 1 e 5.' });
  }

  const result = await AvaliationService.avaliarAcomodacao(id_reserva, estrelas, comentario_);
  
  res.json({ message: 'Avaliação registrada com sucesso!', result });
};

