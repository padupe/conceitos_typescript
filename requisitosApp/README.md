# 🚘️ Cadastro de Veículo

**RF** - _Requisitos Funcionais_

- Deve ser possível cadastrar um novo veículo.

**RNF** - _Requisitos Não Funcionais_

**RN** - _Regras de Negócios_

- Apenas usuários com perfil "Administrador" podem realizar o Cadastro de um novo veículo.
- Não deve ser possível cadastrar um veículo com placa já existente.
- O veículo deve ser cadastrado com disponibilidade por padrão.

---

# 🚘️ Listagem de Veículos

**RF** - _Requisitos Funcionais_

- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome do veículo.

**RNF** - _Requisitos Não Funcionais_

**RN** - _Regras de Negócios_

- O usuário não precisa estar logado no sistema.

---

# 🚘️ Cadastro de Especificação do Veículo

**RF** - _Requisitos Funcionais_

- Deve ser possível cadastrar uma especificação para um veículo.

**RNF** - _Requisitos Não Funcionais_

**RN** - _Regras de Negócios_

- Apenas usuários com perfil "Administrador" podem realizar o Cadastro de uma nova especificação.
- Não deve ser possível cadastrar uma especificação para um veículo inexistente.
- Não deve ser possível duplicar (ou mais vezes) um cadastro de especifiação para o mesmo veículo.
- O veículo deve ser cadastrado com disponibilidade por padrão.

---

# 🚘️ Cadastro de Imagem do Veículo

**RF** - _Requisitos Funcionais_

- Deve ser possível cadastrar a imagem do veículo.

**RNF** - _Requisitos Não Funcionais_

- Utilizar o multer para _upload_ dos arquivos.

**RN** - _Regras de Negócios_

- Apenas usuários com perfil "Administrador" podem realizar o Cadastro de uma nova especificação.
- O usuário deve poder cadastrar mais de uma imagem para o mesmo veículo.

---

# 🚘️ Cadastro de Aluguel de Veículos

**RF** - _Requisitos Funcionais_

- Deve ser possível cadastrar um aluguel de veículo.

**RNF** - _Requisitos Não Funcionais_

**RN** - _Regras de Negócios_

- O aluguel deve ter duração mínima de 24 (vinte e quatro) horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista para o mesmo veículo.
- O usuário deve estar "logado" na Aplicação.

---

# 🚘️ Devolução de Veículos

**RF** - _Requisitos Funcionais_

- Deve ser possível realizar a devolução de um veículo.

**RNF** - _Requisitos Não Funcionais_

**RN** - _Regras de Negócios_

- Se o carro for devolvido com menos de 24 horas, deverá ser cobrada a diária completa.
- Ao realizar a devolução, o veículo deverá ser liberado para outro aluguel.
- Ao realizar a devolução. o usuário deverá ser liberado para realizar outro aluguel.
- Ao realizar a devolução, a aplicação deverá realizar o cálculo do valor total do aluguel.
- Caso o horário de devolução seja superior ao previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
- Caso exista multa, o valor deverá ser adicionado ao valor total do aluguel.

---

# 🚘️ Modelo

**RF** - _Requisitos Funcionais_

**RNF** - _Requisitos Não Funcionais_

**RN** - _Regras de Negócios_
