"use strict";

var _CategoriesRepositoryInMemory = require("@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateCategoryUseCase = require("./CreateCategoryUseCase");

let createCategoryUseCase;
let categoriesRepositoryInMemory;
describe("Create Category", () => {
  // Realizar Antes de TODOS os Testes
  beforeEach(() => {
    categoriesRepositoryInMemory = new _CategoriesRepositoryInMemory.CategoriesRepositoryInMemory();
    createCategoryUseCase = new _CreateCategoryUseCase.CreateCategoryUseCase(categoriesRepositoryInMemory);
  });
  it("should be able to create a new category", async () => {
    const newCategory = {
      name: 'Category Test',
      description: 'Category Description Test'
    };
    await createCategoryUseCase.execute({
      name: newCategory.name,
      description: newCategory.description
    });
    const categoryCreated = await categoriesRepositoryInMemory.findByName(newCategory.name); // Esperamos que o 'categoryCreated' possua a propriedade 'id'.
    // O 'id' só será criado se a Categoria não existir, conforme a regra de negócio.

    expect(categoryCreated).toHaveProperty('id');
  });
  it("should not be able to create a new category with name exists", async () => {
    const newCategory = {
      name: 'Category Test',
      description: 'Category Description Test'
    };
    await createCategoryUseCase.execute({
      name: newCategory.name,
      description: newCategory.description
    });
    await expect(createCategoryUseCase.execute({
      name: newCategory.name,
      description: newCategory.description
    })).rejects.toEqual(new _AppError.AppError('Category Already Exists!'));
  });
});