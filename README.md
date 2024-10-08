# 🚙 FlexiLease Autos

O projeto FlexiLease Autos é parte do 3º Desafio | NODE.JS + AWS_JUL24.

# 🏬 Sobre o projeto
Esta FULL API REST foi desenvolvida para o gerenciamento de uma concessionária especializada na locação de veículos O projeto conta com diversas funcionalidades como registro de carros, reservas, usuários e autenticação.

## Tecnologias Utilizadas
  [![My Skills](https://skillicons.dev/icons?i=typescript,nodejs,sqlite,express,git,github)](https://skillicons.dev)

## Instrução de uso
Como rodar o projeto na aplicação:

```bash
npm run dev
```


### Instrução de Instalação
**Como instalar e configurar o projeto:**

1. Clone o Repositório

```bash
https://github.com/Jhennyf/Projeto-FlexiLease-Autos.git
cd Projeto-FlexiLease-Autos
```
2. Configure o banco de Dados
```bash
create database FlexiLease
use FlexiLease
```
4. Compile e Execute a aplicação
```bash
npm i
npm run dev
```
5. Acesse a API no swagger
```bash
http://localhost:3001/api-docs/
```

# 📍 EndPoints
### EndPoints Car

```javascript
- GET    /car - Listar todos os carros.
- POST   /car - Cria um Carro e lista.
- PUT    /car/:id - Altera dados de um Carro e salva.
- DELETE /car/:id -  Apaga um Carro.
- GET    /car?year  - Listar por query.
```



### EndPoints User

```javascript
- GET    /user - Lista todos os usuários
- GET    /user/:id - Listar por id
- POST   /pet/:tutorId - Cria um carro.
- PUT    /pet/:petId/tutor/:tutorId - Altera dados de um carro e salva.
- DELETE /pet/:petId/tutor/:tutorId - Apaga um carro.
```

### EndPoints Reserve

```javascript
- GET    /reserve - Lista todas reservas.
- GET    /reserve/:id - Listar por id.
- POST   /reserve/:tutorId - Cria uma reserva e lista somente ele.
- PUT    /reserve/:petId/tutor/:tutorId - Altera dados de uma reserva e salva.
- DELETE /reserve/:petId/tutor/:tutorId - Apaga uma reserva.
```


# 📁 Estrutura de Pastas do Projeto

```plaintext
Projeto-FlexiLease-Autos
├──src                        # Código-fonte do projeto
│   ├──api                    # Lógica da API
│   │    ├── controller/      # Controladores que gerenciam as requisições
│   │    ├── dto/             # Objetos de Transferência de Dados
│   │    ├── middlewares/     # Funções para processamento de requisições
│   │    ├── services/        # Serviços que contêm a lógica de negócios
│   │    ├── utils/           # Funções utilitárias
│   ├── database/             # Configurações e modelos do banco de dados
│   ├── routes/               # Definições das rotas da API
│   ├── index.ts/             # Arquivo principal que inicia a aplicação
├── .editorconfig/            # Configurações do editor de código
├── .env                      # Variáveis de ambiente
├── .eslintignore             # Arquivos ignorados pelo ESLint
├── .eslintsrc                # Configurações do ESLint
├── .gitignore                # Arquivos e diretórios ignorados pelo Git
├── .prettierrc               # Configurações do Prettier
├── flexilease.db             # Arquivo do banco de dados
├── ormconfig.json            # Configurações do ORM
├── package-lock.json         # Arquivo de bloqueio de dependências do npm.
├── package.json              # Arquivo de configuração do npm.
├── README.md                 # Documentação do projeto
└── tsconsfig.json            # Documentação do projeto

```
