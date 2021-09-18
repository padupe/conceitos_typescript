

describe("Create Category", () => {
    it("Soma", () => {
        const soma = 2 + 2;
        const resultado = 4;

        expect(soma).toBe(resultado);
    });

    it("Falha na Soma", () => {
        const soma = 2 + 2;
        const resultado = 5;

        expect(soma).not.toBe(resultado);
    })
})