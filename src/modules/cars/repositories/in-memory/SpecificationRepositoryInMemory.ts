import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";



class SpecificationRepositoryInMemory implements ISpecificationsRepository {

    specifications: Specification[] = [];

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const newSpecification = new Specification();

        Object.assign(newSpecification, {
            name,
            description,
        });
        
        this.specifications.push(newSpecification);

        return newSpecification;
    };

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find((findSpecification) => findSpecification.name === name);
    };

    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter((findSpecifications) => ids.includes(findSpecifications.id));

        return allSpecifications;
    };
    
};

export { SpecificationRepositoryInMemory };