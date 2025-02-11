import ReservationRepository from '../repositories/reservation.repository';

class AvaliationService {
    static async avaliarAcomodacao(id: string,num_Estrelas: number,comentario: string){

        const reservationRepository = new ReservationRepository();
        const reserva = await reservationRepository.getReservation(id);

        if (!reserva) {
            throw new Error("Reserva não encontrada.");
        }

        reserva.rating = { stars: num_Estrelas, comment: comentario };

        await reservationRepository.updateReservation(id, reserva);


    }
}
export default AvaliationService;