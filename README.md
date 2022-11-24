# Boas-vindas ao meu repositório do projeto Car Shop!

## Me dê feedbacks sobre o projeto!

Entre em contato pelas redes sociais e me dê dicas, conselhos e informações que julgar necessario para o meu crescimento como dev.

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/erikadeolima)](https://github.com/erikadeolima)
[![Linkedin Badge](https://img.shields.io/badge/-erikadeolima-blue?style=flat&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/erikadeolima/)](https://www.linkedin.com/in/erikadeolima/)
[![Hotmail](https://img.shields.io/badge/-erikadeolima-c14438?style=flat&logo=microsoft-outlook&logoColor=white&link=mailto:erikadeo.lima@hotmail.com)](mailto:erikadeo.lima@hotmail.com)

---

## Quer ver o projeto funcionando dentro do ambiente do MongoDB?
---
 #### Utiliza Linux? Pule as etapas **1 a 5**. 

---
 #### Utiliza Windows? Siga o seguinte passo a passo:
  - **⚠ Retirado do tutorial [Como usar Docker sem GNU/Linux](https://stack.desenvolvedor.expert/appendix/docker/macos_e_windows.html)**

---

  1º - Instale o Docker, que é um gerenciador de ambientes virtuais, em sua máquina:
      Pode achar o que melhor se adequa a sua versão de Sistema Operacinal (S.O.) [aqui](https://www.docker.com/products/docker-desktop/);

  2º - Primeiro verificamos se não existem máquinas virtuais com Docker instaladas em seu ambiente com o comando `docker-machine ls`, dentro do terminal (`Prompt de Comando`). Este comando verifica as maquinas virtuais (M.V.) criadas na sua máquina. Caso não retorne nehhuma, crie uma com o comando `docker-machine create --driver virtualbox default` (ainda dentro do terminal), o retorno será algo como:
  ![alt text](images/resultado_macos_windows.png)

  3º - Para desligar a máquina virtual(M.V.), basta executar o comando `docker-machine stop default`;

  4º - Para iniciar, novamente, a máquina, basta executar o comando `docker-machine start default`;

  5º -  O comando `docker-machine env default` aplica as variaveis de ambiente necessárias para que os aplicativos de controle das M.V.'s (Docker e Docker-compose), funcione corretamente. O retorno será algo como a seguinte imagem:
  ![alt text](images/resultado_macos_windows2.png)

  - Que são os comandos necessários para configurar todas as variáveis. Você pode copiar as quatros primeiras linhas, que começam com “export”, e colar no terminal ou, pegar apenas a última linha sem o “#” do início e executar na linha de comando `eval $(docker-machine env default)`;

  **⚠ Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**

  6º - Rode os serviços `node` e `db` com o comando `docker-compose up -d`.

  - Esses serviços irão inicializar um container chamado `car_shop` e outro chamado `car_shop_db`.
  - A partir daqui você pode rodar o container `car_shop` via CLI ou abri-lo no VS Code, utilizando o comando `docker exec -it car_shop bash`, que te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  - Instale as dependências com `npm install`, **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec -it car_shop bash` citado acima. 

  - ✨ **Dica:** A extensão `Remote - Containers` (que estará na seção de extensões recomendadas do VS Code) é indicada para que você possa desenvolver sua aplicação no container Docker direto no VS Code, como você faz com seus arquivos locais.
---
## 👨‍💻 O que foi desenvolvido

  Neste projeto, foi aplicado os princípios de Programação Orientada a Objetos (`POO`) para a construção de uma API com `CRUD` para gerenciar uma concessionária de veículos. Isso foi feito utilizando o banco de dados `MongoDB` através do framework do `Mongoose`.
  
## Orientações
<summary>

### A rota POST: /cars é possível cadastrar um carro
<details open>
  - Através do caminho `/cars` é possível acessar o banco de dados do MongoDB e realizar o cadastro de um carro, com o seguinte formato de corpo da requisição tem o formato abaixo:

  ```json
  {
    "model": "Marea",
    "year": 2002,
    "color": "Black",
    "status": true, // item opcional
    "buyValue": 15.990,
    "doorsQty": 4,
    "seatsQty": 5
  }
  ```
  - Que quando cadastrado retornará um JSON com as seguintes chaves:
  ```json
  {
    "id": "6348513f34c397abcad040b2",
    "model": "Marea",
    "year": 2002,
    "color": "Black",
    "status": true,
    "buyValue": 15.990,
    "doorsQty": 4,
    "seatsQty": 5
  }
  ```
</details>

---

### A rota GET:/cars é possível listar todos os carros e a  rota GET:/cars/:id é possível listar um carro
<details open>

  - Através do caminho (`/cars`) e (`/cars/:id`) é possível listar os carros da collection `cars` do banco de dados e apenas o carro com o `id` presente na URL deve ser retornado, respectivamente;

  - Será validado que é possível listar todos os carros;
  - Sendo os JSON's respectivos: 
  ```json
    [
      {
        "id": "634852326b35b59438fbea2f",
        "model": "Marea",
        "year": 2002,
        "color": "Black",
        "status": true,
        "buyValue": 15.99,
        "doorsQty": 4,
        "seatsQty": 5
      },
      {
        "id": "634852326b35b59438fbea31",
        "model": "Tempra",
        "year": 1995,
        "color": "Black",
        "buyValue": 39,
        "doorsQty": 2,
        "seatsQty": 5
      }
    ]
    ```

  ```json
    {
      "id": "634852326b35b59438fbea2f",
      "model": "Marea",
      "year": 2002,
      "color": "Black",
      "status": true,
      "buyValue": 15.99,
      "doorsQty": 4,
      "seatsQty": 5
    }
  ```

  - Quando não for possível listar um carro que não existe retornará o `status 404` e um JSON com a seguinte mensagem: 
  ```json
    { "message": "Car not found" }
  ```
  - Quando não é possível listar um carro quando o formato do `id` esta inválido retornará o `status 422` e um JSON com a seguinte mensagem: 
  ```json
    { "message": "Invalid mongo id" }
  ```
</details>

---

### A rota PUT:/cars/:id onde é possível atualizar um carro por ID
<details open>

  - Através do caminho (`/cars/:id`), será possível atualizar, apenas o carro com o `id` presente na URL, com o seguinte formato de corpo da requisição tem o formato abaixo:
  ```json
  {
    "model": "Marea",
    "year": 1992,
    "color": "Red",
    "status": true,
    "buyValue": 12.000,
    "doorsQty": 2,
    "seatsQty": 5
  }
  ```

  - Que quando atualizado retornará um JSON com as seguintes chaves:
  ```json
    {
      "id": "634852326b35b59438fbea2f",
      "model": "Marea",
      "year": 1992,
      "color": "Red",
      "status": true,
      "buyValue": 12.000,
      "doorsQty": 2,
      "seatsQty": 5
    }
  ```

  - Não será possível alterar um carro que não existe, irá retornar o `status 404` e um JSON com a seguinte mensagem: 
  ```json
    { "message": "Car not found" }
  ```

  - Não será possível alterar um carro quando o formato do `id` esta inválido irá retornar o `status 422` e um JSON com a seguinte mensagem: 
  ```json
    { "message": "Invalid mongo id" }
  ```
</details>

---

### A rota DELETE:/cars/:id é possível excluir um carro por ID
<details open>

- Através do caminho `/cars/:id`, [e possível deletar do banco apenas o carro com o `id` presente na URL, retornando `status 204` sem body;
- Não é possível excluir um carro que não existe, retornará `status 404` e um JSON com a mensagem:

```json
  { "message": "Car not found" }
```

- Não é possível excluir um carro quando o formato do `id` esta inválido, e retornará `status 422` e um JSON com a mensagem:

```json
  { "message": "Invalid mongo id" }
```
</details>

---

### A rota POST:/motorcycles é possível cadastrar uma moto
<details open>

  - Através do caminho `/motorcycles` é possível acessar o banco de dados do MongoDB e realizar o cadastro de uma moto, com o seguinte formato de corpo da requisição tem o formato abaixo:

  ```json
  {
  "model": "Honda Cb 600f Hornet",
  "year": 2005,
  "color": "Yellow",
  "status": true,
  "buyValue": 30.000,
  "category": "Street",
  "engineCapacity": 600
  }
  ```
  - Que quando cadastrado retornará um JSON com as seguintes chaves:
  ```json
  {
    "id": "6348513f34c397abcad040b2",
    "model": "Honda Cb 600f Hornet",
    "year": 2005,
    "color": "Yellow",
    "status": true,
    "buyValue": 30.000,
    "category": "Street",
    "engineCapacity": 600
  }
  ```
</details>

---

### A rota GET:/motorcycles é possível listar todos as motos e a  rota GET:/motorcycles/:id é possível listar uma moto
<details open>

  - Através do caminho (`/motorcycles`) e (`/motorcycles/:id`) é possível listar as motos da collection `motorcycles` do banco de dados e apenas a moto com o `id` presente na URL deve ser retornado, respectivamente;

  - Será validado que é possível listar todos as motos;
  - Sendo os JSON's respectivos: 
  ```json
  [
    {
      "id": "634852326b35b59438fbea2f",
      "model": "Honda Cb 600f Hornet",
      "year": 2005,
      "color": "Yellow",
      "status": true,
      "buyValue": 30.000,
      "category": "Street",
      "engineCapacity": 600
    },
    {
      "id": "634852326b35b59438fbea31",
      "model": "Honda Cbr 1000rr",
      "year": 2011,
      "color": "Orange",
      "status": true,
      "buyValue": 59.900,
      "category": "Street",
      "engineCapacity": 1000
    }
  ]
  ```

  ```json
  {
    "id": "634852326b35b59438fbea31",
    "model": "Honda Cbr 1000rr",
    "year": 2011,
    "color": "Orange",
    "status": true,
    "buyValue": 59.900,
    "category": "Street",
    "engineCapacity": 1000
  }
  ```
  - Quando não for possível listar uma moto que não existe retornará o `status 404` e um JSON com a seguinte mensagem: 
  ```json
    { "message": "Motorcycle not found" }
  ```
  - Quando não é possível listar uma moto quando o formato do `id` esta inválido retornará o `status 422` e um JSON com a seguinte mensagem: 
  ```json
    { "message": "Invalid mongo id" }
  ```
</details>

---

### A rota PUT:/motorcycles/:id onde é possível atualizar uma moto por ID
<details open>

  - Através do caminho (`/motorcycles/:id`), será possível atualizar, apenas a moto com o `id` presente na URL, com o seguinte formato de corpo da requisição tem o formato abaixo:
  ```json
  {
    "model": "Marea",
    "year": 1992,
    "color": "Red",
    "status": true,
    "buyValue": 12.000,
    "doorsQty": 2,
    "seatsQty": 5
  }
  ```

  - Que quando atualizado retornará um JSON com as seguintes chaves:
  ```json
    {
      "model": "Honda Cb 600f Hornet",
      "year": 2014,
      "color": "Red",
      "status": true,
      "buyValue": 45.000,
      "category": "Street",
      "engineCapacity": 600
    }
  ```

  - Não será possível alterar uma moto que não existe, irá retornar o `status 404` e um JSON com a seguinte mensagem: 
  ```json
    { "message": "Motorcycle not found" }
  ```

  - Não será possível alterar uma moto quando o formato do `id` esta inválido irá retornar o `status 422` e um JSON com a seguinte mensagem: 
  ```json
    { "message": "Invalid mongo id" }
  ```
</details>

---

### A rota DELETE:/motorcycles/:id é possível excluir um carro por ID
<details open>

- Através do caminho `/motorcycles/:id`, é possível deletar do banco apenas o carro com o `id` presente na URL, retornando `status 204` sem body;
- Não é possível excluir um carro que não existe, retornará `status 404` e um JSON com a mensagem:

```json
  { "message": "Motorcycle not found" }
```

- Não é possível excluir um carro quando o formato do `id` esta inválido, e retornará `status 422` e um JSON com a mensagem:

```json
  { "message": "Invalid mongo id" }
```
</details>

---
### 🛠 Execução de testes localmente

<details>

  Foi realizado a implementação de testes unitários na camada Service. Foi utilizado as bibliotecas `Sinon`, `Chai` e `Mocha` integrando o Mongoose para acessar as camadas conforme a camada.

  **Ainda está em processo de aprimoramento, onde irei implementar os testes unitários nas camadas `Model` e `Controller`. Além dos testes de intrgração.**

  Para executar os testes localmente, digite no terminal o comando `npm run test:mocha` **dentro do terminal do container (`docker exec -it car_shop bash`)**.

  Para executar apenas um teste por vez, basta executar o comando `npm run test:mocha`.

  Você também pode desabilitar temporariamente um teste utilizando a função `skip` junto à função `describe`. Como o nome indica, a função a seguir "pula" um teste:

  ```
  describe.skip('...', () => {})
  ```
</details>

---
