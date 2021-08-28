import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificatonsRepository";
import { Specification } from '../../entities/Specification'


class SpecificationsRepository implements ISpecificationsRepository {
    private specifications: Specification[];

    constructor() {
        this.specifications = [];
    };

    create({ name, description }: ICreateSpecificationDTO): void {
        const specificaton = new Specification();

        Object.assign(specificaton, {
            name,
            description,
            created_at: new Date(),
        });

        this.specifications.push(specificaton);
    };

    findByName(name: string): Specification {
        const specification = this.specifications.find(specificationfind => specificationfind.name === name);
        return specification;
    };
};

export { SpecificationsRepository };