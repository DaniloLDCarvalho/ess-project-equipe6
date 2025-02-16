import ReservationRepository from '../repositories/reservation.repository';

class AvaliationService {
  private reservationRepository: ReservationRepository;

  constructor(reservationRepository: ReservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  async avaliarAcomodacao(id: string, num_Estrelas: number, comentario: string) {
    try {
      const reservas = await this.reservationRepository.getReservations();
      console.log('Reservations:', reservas);

      const reserva = reservas.find(res => res.id === id);

      if (!reserva) {
        throw new Error('Reserva não encontrada.');
      }
      reserva.rating = { stars: num_Estrelas, comment: comentario };

      const updatedReservation = await this.reservationRepository.updateReservation(id, reserva);
      console.log('Updated Reservation:', updatedReservation);

      return updatedReservation;
    } catch (error) {
      console.error('Error in AvaliationService.avaliarAcomodacao:', error);
      throw error; // Re-throw the error to be caught by the controller
    }
  }
}

export default AvaliationService;