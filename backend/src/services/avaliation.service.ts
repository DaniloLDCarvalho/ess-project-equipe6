import ReservationRepository from '../repositories/reservation.repository';
import Database from '../database';

class AvaliationService {
    static async avaliarAcomodacao(id: string,num_Estrelas: number,comentario: string){

        const reservationRepository = new ReservationRepository();
        const reservas = await reservationRepository.getReservations();
        console.log(reservas);
    
       //const db = Database.getInstance();  // Obtém a instância única do banco
        //const reservas = db.data.reservations; // Acessa a lista de reservas

        const reserva = reservas.find(res => res.id === id);

        if (!reserva) {
            throw new Error("Reserva não encontrada.");
        }

        reserva.rating = { stars: num_Estrelas, comment: comentario };

        await reservationRepository.updateReservation(id, reserva);

    }
}
export default AvaliationService;