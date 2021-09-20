import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {

    // Realizar Antes de TODOS os Testes
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory;
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);       
    })

    it("should be able to create a new category", async () => {
        const newCategory = {
            name: 'Category Test',
            description: 'Category Description Test',
        }

        await createCategoryUseCase.execute({
            name: newCategory.name,
            description: newCategory.description,
        });
        
        const categoryCreated = await categoriesRepositoryInMemory.findByName(newCategory.name);

        console.log(categoryCreated);

        // Esperamos que o 'categoryCreated' possua a propriedade 'id'.
        // O 'id' só será criado se a Categoria não existir, conforme a regra de negócio.
        expect(categoryCreated).toHaveProperty('id');
    });
})