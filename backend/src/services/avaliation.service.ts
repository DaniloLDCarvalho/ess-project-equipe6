import ReservationRepository from '../repositories/reservation.repository';
import Database from '../database';

class AvaliationService {
  static async avaliarAcomodacao(id: string, num_Estrelas: number, comentario: string) {
    try {
      const reservationRepository = new ReservationRepository();
      const reservas = await reservationRepository.getReservations();
      console.log('Reservations:', reservas);

      const reserva = reservas.find(res => res.id === id);

      if (!reserva) {
        throw new Error('Reserva não encontrada.');
      }
      reserva.rating = { stars: num_Estrelas, comment: comentario };

      const updatedReservation = await reservationRepository.updateReservation(id, reserva);
      //console.log('Updated Reservation:', updatedReservation);

      return updatedReservation;
    } catch (error) {
      console.error('Error in AvaliationService.avaliarAcomodacao:', error);
      throw error; // Re-throw the error to be caught by the controller
    }
  }
}

export default AvaliationService;