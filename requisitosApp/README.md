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

---

# 🚘️ Modelo

**RF** - _Requisitos Funcionais_

**RNF** - _Requisitos Não Funcionais_

**RN** - _Regras de Negócios_
