import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import ReservationRepository from '../../src/repositories/reservation.repository';
import AvaliationService from '../../src/services/avaliation.service';
import ReservationEntity from '../../src/entities/reservation.entity';

describe('AvaliationController', () => {
  let request = supertest(app);
  let mockReservationRepository: ReservationRepository;
  let mockReservationEntity: ReservationEntity;

  beforeEach(() => {
    mockReservationRepository = di.getRepository<ReservationRepository>(ReservationRepository);
    
    mockReservationEntity = new ReservationEntity({
      id: 'f5b0e3d2-4b6f-4d8f-8f5a-7b1a5b2f8a1a',
      pf_id: '1',
      room_id: '1',
      check_in: new Date('2025-03-09'),
      check_out: new Date('2025-03-10'),
      guests: 0,
      total: 0,
      status: 'o',
      rating: {
        stars: 0,
        comment: 'o'
      }
    });
  });

  it('should register an accommodation review successfully', async () => {
    const response = await request.post(`/api/avaliacoes?id=${mockReservationEntity.id}`).send({
      num_estrelas: 5,
      comentario: 'Ótima acomodação!'
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Avaliação registrada com sucesso!');
    expect(response.body.result).toBeDefined();
  });

  it('should return an error when the rating is not between 1 and 5', async () => {
    const response = await request.post('/api/avaliacoes?id=123').send({
      num_estrelas: 6,
      comentario: 'Nota inválida'
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toEqual('A nota deve ser um número entre 1 e 5.');
  });

  it('should limit the comment length to 500 characters', async () => {
    const longComment = 'a'.repeat(600);
    const response = await request.post('/api/avaliacoes?id=123').send({
      num_estrelas: 4,
      comentario: longComment
    });

    expect(response.status).toBe(400); // Ajustado para 400, pois deveria falhar devido ao tamanho do comentário.
  });
});
