# API REST — Usuários e Tarefas

Projeto didático de uma API REST simples em Node.js + Express, com CRUD de **usuários** e **tarefas**, sem banco de dados (dados em memória).

Material de apoio à disciplina — SENAC / UC3.

---

## Objetivo

Servir como **referência de implementação** para a atividade descrita no documento `Guia-Construcao-API-REST.docx`. Use este código apenas para **conferir** sua implementação depois de tentar fazer sozinho.

---

## Stack

- Node.js 18+
- Express 4
- Nodemon (apenas em desenvolvimento)
- ES Modules (`import` / `export`)

---

## Estrutura de pastas

```
api-rest-senac/
├── package.json
├── index.js                 # ponto de entrada do servidor
├── .gitignore
└── src/
    ├── data/
    │   └── db.js            # arrays em memória + contadores de id
    ├── controllers/
    │   ├── usuariosController.js
    │   └── tarefasController.js
    └── routes/
        ├── usuariosRoutes.js
        └── tarefasRoutes.js
```

### Responsabilidade de cada camada

| Camada | Responsabilidade |
|---|---|
| `index.js` | Sobe o Express, registra middlewares e monta as rotas. |
| `routes/` | Mapeia verbo HTTP + caminho para a função do controller. |
| `controllers/` | Implementa a lógica do CRUD (validações, manipulação dos arrays, respostas HTTP). |
| `data/db.js` | Simula o "banco" com arrays em memória e contadores de id. |

---

## Como rodar

Pré-requisito: Node.js 18 ou superior instalado (`node -v`).

```bash
# 1) instalar dependências
npm install

# 2) rodar em modo desenvolvimento (auto-reload com nodemon)
npm run dev

# ou rodar normalmente
npm start
```

O servidor sobe em `http://localhost:3000`.

---

## Endpoints

Base URL: `http://localhost:3000`

### Usuários — `/usuarios`

| Verbo | Caminho | Descrição |
|---|---|---|
| GET | `/usuarios` | Lista todos os usuários |
| GET | `/usuarios/:id` | Busca usuário por id |
| POST | `/usuarios` | Cria novo usuário |
| PUT | `/usuarios/:id` | Atualiza campos do usuário (parcial) |
| DELETE | `/usuarios/:id` | Remove usuário |

**Modelo de usuário**

```json
{
  "id": 1,
  "nome": "Maria",
  "email": "maria@example.com",
  "telefone": "27999999999",
  "senha": "123456"
}
```

**Campos obrigatórios no POST:** `nome`, `email`, `telefone`, `senha`.

### Tarefas — `/tarefas`

| Verbo | Caminho | Descrição |
|---|---|---|
| GET | `/tarefas` | Lista todas as tarefas |
| GET | `/tarefas/:id` | Busca tarefa por id |
| POST | `/tarefas` | Cria nova tarefa |
| PUT | `/tarefas/:id` | Atualiza tarefa (parcial) |
| DELETE | `/tarefas/:id` | Remove tarefa |

**Modelo de tarefa**

```json
{
  "id": 1,
  "titulo": "Estudar Node",
  "concluida": false,
  "usuarioId": 1
}
```

**Campos obrigatórios no POST:** `titulo`, `usuarioId` (precisa existir em `/usuarios`).

---

## Exemplos de requisição (curl)

### Listar usuários

```bash
curl http://localhost:3000/usuarios
```

### Criar usuário

```bash
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria",
    "email": "maria@example.com",
    "telefone": "27988887777",
    "senha": "123456"
  }'
```

### Atualizar parcialmente

```bash
curl -X PUT http://localhost:3000/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{ "telefone": "27911112222" }'
```

### Remover usuário

```bash
curl -X DELETE http://localhost:3000/usuarios/1
```

### Criar tarefa vinculada a um usuário

```bash
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{ "titulo": "Estudar Node", "usuarioId": 1 }'
```

---

## Códigos de status usados

| Código | Quando |
|---|---|
| 200 | OK em GET, PUT e DELETE |
| 201 | Recurso criado com sucesso (POST) |
| 400 | Body inválido / campos obrigatórios ausentes / referência inexistente |
| 404 | Recurso não encontrado por id |

---

## Conceitos de JavaScript exercitados

- **Arrays:** `find`, `findIndex`, `some`, `push`, `splice`
- **Funções:** declaradas com `export function` e usadas em rotas
- **Objetos:** spread (`...`) com short-circuit para atualização parcial
- **Módulos:** `import` / `export` com ESM (`"type": "module"` no `package.json`)

---

## Limitações conhecidas (são propositais — didático)

- Dados em memória: ao reiniciar o servidor, tudo se perde.
- Senha em texto puro, sem hash. **Não use isso em produção.**
- Sem autenticação. Qualquer cliente pode chamar qualquer endpoint.
- Sem unicidade de email — é possível cadastrar dois usuários com o mesmo email.
- Sem tratamento global de erros — cada controller lida com os seus.

---

## Próximos passos sugeridos (desafios)

1. Impedir cadastro com email duplicado (retornar 409).
2. Criar `GET /usuarios/:id/tarefas` retornando só as tarefas daquele usuário.
3. Omitir o campo `senha` nas respostas.
4. Persistir os dados em um arquivo `data.json`.
5. Validar formato do email com regex.
6. Trocar o array por um banco real (SQLite ou MongoDB).
7. Adicionar autenticação com JWT e proteger as rotas.

---

## Erros comuns

| Sintoma | Provável causa |
|---|---|
| `SyntaxError: Cannot use import statement outside a module` | Faltou `"type": "module"` no `package.json`. |
| `req.body` chega como `undefined` | Faltou `app.use(express.json())` no `index.js`. |
| `Cannot find module './foo'` | Em ESM a extensão `.js` no import é obrigatória. |
| Servidor não atualiza ao salvar | Está rodando `node` em vez de `nodemon` — use `npm run dev`. |
| Comparação por id sempre falsa | Esqueceu de converter `req.params.id` com `Number()`. |

---

## Licença

Uso livre para fins educacionais.
