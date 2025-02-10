import ReservationRepository from '../repositories/reservation.repository';

class AvaliationService {
    static async avaliarAcomodacao(id: string,num_Estrelas: number,comentario: string){

        const reservationRepository = new ReservationRepository();
        const reserva = await reservationRepository.getReservation(id);




    }
}