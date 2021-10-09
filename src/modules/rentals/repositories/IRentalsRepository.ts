


interface IRentalsRepository {
    findRentalOpenByCar(car_id: string): Promise<Rental>;
    findRentalOpenByUser(user_id: string): Promise<Rental>;
};

export { IRentalsRepository };