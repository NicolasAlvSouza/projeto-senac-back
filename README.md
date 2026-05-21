# API REST — Usuários e Tarefas

API didática em Node.js + Express + SQLite com CRUD completo de usuários, login via JWT e CRUD completo de tarefas.

O projeto é uma implementação para a disciplina UC3 do SENAC, mostrando autenticação, proteção de rotas, criptografia de senhas e persistência em banco de dados local.

---

## Objetivo

Demonstrar um backend REST com:
- cadastro e login de usuários
- autenticação JWT
- CRUD completo de usuários
- CRUD completo de tarefas
- listagem de tarefas por usuário
- proteção das rotas sensíveis via middleware

---

## Stack

- Node.js 18+
- Express 4
- SQLite (`sqlite`, `sqlite3`)
- JWT (`jsonwebtoken`)
- bcrypt
- helmet
- cors
- dotenv
- nodemon (desenvolvimento)
- ES Modules (`type": "module"`)

---

## Estrutura de pastas

```
projeto-senac-back/
├── package.json
├── package-lock.json
├── index.js
├── README.md
└── src/
    ├── controllers/
    │   ├── usuariosController.js
    │   └── tarefasController.js
    ├── data/
    │   ├── db.js
    │   └── database.db
    ├── middlewares/
    │   └── autenticacao.js
    └── routes/
        ├── usuariosRoutes.js
        └── tarefasRoutes.js
```

### Responsabilidade de cada camada

| Camada | Responsabilidade |
|---|---|
| `index.js` | Sobe o Express, registra middlewares globais e monta as rotas. |
| `routes/` | Mapeia URLs para controllers e aplica autenticação quando necessário. |
| `middlewares/` | Validação de JWT e regras de segurança antes do controller. |
| `controllers/` | Implementa lógica de CRUD, login e respostas HTTP. |
| `data/db.js` | Abre conexão SQLite e cria o schema se necessário. |

---

## Como rodar

Pré-requisitos: Node.js 18+.

```bash
npm install
```

Crie um arquivo `.env` na raiz com as variáveis abaixo:

```env
PORT=3000
JWT_SECRET=umaSenhaSecreta
JWT_EXPIRES_IN=1d
```

Depois execute:

```bash
npm run dev
```

Ou em produção:

```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`.

---

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `PORT` | Porta do servidor HTTP. Padrão `3000`. |
| `JWT_SECRET` | Segredo usado para assinar e verificar tokens JWT. |
| `JWT_EXPIRES_IN` | Tempo de expiração do token JWT (ex.: `1d`, `12h`). |

---

## Endpoints

Base URL: `http://localhost:3000`

### Auth / Usuários

| Método | URL | Protegido | Descrição |
|---|---|---|---|
| POST | `/usuarios` | não | Cadastra novo usuário |
| POST | `/usuarios/login` | não | Autentica usuário e devolve JWT |
| GET | `/usuarios/perfil` | sim | Retorna os dados do usuário logado |
| GET | `/usuarios` | sim | Lista todos os usuários |
| GET | `/usuarios/:id` | sim | Busca usuário por id |
| PUT | `/usuarios/:id` | sim | Atualiza dados do próprio usuário |
| DELETE | `/usuarios/:id` | sim | Remove o próprio usuário |

> `Authorization` deve ser enviado como `Bearer <token>` nas rotas protegidas.

**Cadastro de usuário**

```json
{
  "nome": "Maria",
  "email": "maria@example.com",
  "telefone": "27999999999",
  "senha": "123456"
}
```

A senha é armazenada como hash com `bcrypt` e não é retornada nas respostas.

### Tarefas

Todas as rotas de tarefa são protegidas e usam o `usuarioId` do token.

| Método | URL | Descrição |
|---|---|---|
| GET | `/tarefas` | Lista as tarefas do usuário logado |
| GET | `/tarefas/:id` | Busca tarefa por id (do usuário logado) |
| GET | `/tarefas/usuario/:usuarioId` | Lista tarefas de um usuário específico (somente o próprio usuário) |
| POST | `/tarefas` | Cria nova tarefa para o usuário logado |
| PUT | `/tarefas/:id` | Atualiza tarefa do usuário logado |
| DELETE | `/tarefas/:id` | Remove tarefa do usuário logado |

**Modelo de tarefa**

```json
{
  "id": 1,
  "titulo": "Estudar Node",
  "concluida": false,
  "usuarioId": 1
}
```

**Corpo válido para criação**

```json
{ "titulo": "Estudar Node" }
```

### Fluxo de autenticação

1. Cadastrar usuário:

```bash
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome":"Maria","email":"maria@example.com","telefone":"27988887777","senha":"123456"}'
```

2. Fazer login:

```bash
curl -X POST http://localhost:3000/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{"email":"maria@example.com","senha":"123456"}'
```

3. Usar o token nas rotas protegidas:

```bash
curl http://localhost:3000/usuarios/perfil \
  -H "Authorization: Bearer <token>"
```

4. Criar tarefa:

```bash
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"titulo":"Estudar Node"}'
```

---

## Códigos de status usados

| Código | Significado |
|---|---|
| 200 | Sucesso em GET, PUT, DELETE |
| 201 | Recurso criado com sucesso |
| 400 | Requisição inválida / campos faltando |
| 401 | Não autenticado / token inválido |
| 403 | Sem permissão para acessar o recurso |
| 404 | Recurso não encontrado |
| 409 | E-mail já cadastrado |

---

## Limitações

- Não há validação avançada de formato de email e telefone.
- Não há refresh token ou blacklist de JWT.
- Sem rate limiting.
- Sem testes automatizados.
- Sem frontend integrado.

---

## Observações

- As senhas são protegidas com `bcrypt`.
- O token JWT deve ser enviado no header `Authorization`.
- O banco SQLite é criado em `src/data/database.db`.
