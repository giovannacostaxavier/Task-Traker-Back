# Task Tracker API

API REST para gerenciamento de tarefas (to-do list), com autenticação via JWT.

## 🚀 Stack utilizada

- **Node.js**
- **TypeScript**
- **Express**
- **PostgreSQL** (via `pg`)
- **JWT** (`jsonwebtoken`) para autenticação
- **bcrypt** para hash de senhas
- **Zod** para validação de dados

## 📦 Instalação

```bash
git clone <url-do-repositorio>
cd Task-Traker-Back
npm install
```

## ⚙️ Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=3000
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nome_do_banco
JWT_SECRET=sua_chave_secreta_aqui
```

> `PORT` é opcional — se não for definida, a API sobe na porta `3000` por padrão.

## ▶️ Rodando o projeto

```bash
npm run dev
```

A API sobe por padrão em `http://localhost:3000`.

## 🔐 Autenticação

A API utiliza **JWT (JSON Web Token)**. Após o login, um token é retornado e deve ser enviado no header `Authorization` em todas as rotas protegidas:

```
Authorization: Bearer <seu_token_aqui>
```

Rotas marcadas com 🔒 exigem esse header. Caso o token não seja enviado ou seja inválido/expirado, a API retorna `401 Unauthorized`.

---

## 📚 Endpoints

### Usuários

#### Cadastrar usuário
`POST /users`

**Body:**
```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "senha": "senha123"
}
```

**Validações:**
| Campo | Regra |
|---|---|
| nome | obrigatório |
| email | obrigatório, formato de email válido |
| senha | obrigatório, mínimo 6 caracteres |

**Resposta - `201 Created`:**
```json
{
  "id": 1,
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "criado_em": "2026-08-21T12:00:00.000Z"
}
```

**Erros possíveis:**
| Status | Motivo |
|---|---|
| 400 | Dados inválidos (nome vazio, email inválido, senha curta) |

---

### Login

#### Autenticar usuário
`POST /login`

**Body:**
```json
{
  "email": "maria@email.com",
  "senha": "senha123"
}
```

**Validações:**
| Campo | Regra |
|---|---|
| email | obrigatório, formato de email válido |
| senha | obrigatório |

**Resposta - `200 OK`:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Erros possíveis:**
| Status | Motivo |
|---|---|
| 400 | Dados inválidos (email ou senha ausentes/mal formatados) |
| 401 | Credenciais inválidas (email não encontrado ou senha incorreta) |

---

### Tasks 🔒
*Todas as rotas abaixo exigem autenticação.*

#### Listar todas as tasks
`GET /tasks`

**Resposta - `200 OK`:**
```json
[
  {
    "id": 1,
    "titulo": "Estudar Node.js",
    "descricao": "Revisar módulos ES",
    "status": "todo",
    "user_id": 1
  }
]
```

---

#### Buscar task por ID
`GET /tasks/:id`

**Parâmetros de URL:**
| Parâmetro | Tipo | Descrição |
|---|---|---|
| id | string | ID da task |

**Resposta - `200 OK`:**
```json
{
  "id": 1,
  "titulo": "Estudar Node.js",
  "descricao": "Revisar módulos ES",
  "status": "todo",
  "user_id": 1
}
```

**Erros possíveis:**
| Status | Motivo |
|---|---|
| 404 | Task não encontrada |

---

#### Criar task
`POST /tasks`

**Body:**
```json
{
  "titulo": "Estudar Node.js",
  "descricao": "Revisar módulos ES"
}
```

**Validações:**
| Campo | Regra |
|---|---|
| titulo | obrigatório |
| descricao | opcional |

> O `user_id` é definido automaticamente a partir do usuário autenticado (token).

**Resposta - `201 Created`:**
```json
{
  "id": 2,
  "titulo": "Estudar Node.js",
  "descricao": "Revisar módulos ES",
  "status": "todo",
  "user_id": 1
}
```

**Erros possíveis:**
| Status | Motivo |
|---|---|
| 400 | Título ausente |

---

#### Atualizar task
`PUT /tasks/:id`

**Parâmetros de URL:**
| Parâmetro | Tipo | Descrição |
|---|---|---|
| id | string | ID da task |

**Body:**
```json
{
  "titulo": "Estudar TypeScript",
  "descricao": "Revisar tipos avançados"
}
```

**Validações:**
| Campo | Regra |
|---|---|
| titulo | obrigatório |
| descricao | opcional |

**Resposta - `200 OK`:**
```json
{
  "id": 2,
  "titulo": "Estudar TypeScript",
  "descricao": "Revisar tipos avançados",
  "status": "todo",
  "user_id": 1
}
```

**Erros possíveis:**
| Status | Motivo |
|---|---|
| 400 | Título ausente |
| 404 | Task não encontrada |

---

#### Atualizar status da task
`PATCH /tasks/:id/status`

**Parâmetros de URL:**
| Parâmetro | Tipo | Descrição |
|---|---|---|
| id | string | ID da task |

**Body:**
```json
{
  "status": "doing"
}
```

**Validações:**
| Campo | Regra |
|---|---|
| status | obrigatório, um dos valores: `todo`, `doing`, `done` |

**Resposta - `200 OK`:**
```json
{
  "id": 2,
  "titulo": "Estudar TypeScript",
  "descricao": "Revisar tipos avançados",
  "status": "doing",
  "user_id": 1
}
```

**Erros possíveis:**
| Status | Motivo |
|---|---|
| 400 | Status inválido (fora de todo/doing/done) |
| 404 | Task não encontrada |

---

#### Excluir task
`DELETE /tasks/:id`

**Parâmetros de URL:**
| Parâmetro | Tipo | Descrição |
|---|---|---|
| id | string | ID da task |

**Resposta:** `204 No Content` (sem corpo de resposta)

**Erros possíveis:**
| Status | Motivo |
|---|---|
| 404 | Task não encontrada |

---

## ⚠️ Tratamento de erros

Erros inesperados (não tratados especificamente pela rota) retornam:

**Status:** `500 Internal Server Error`
```json
{
  "erro": "Erro interno do servidor"
}
```

## 🗂️ Resumo das rotas

| Método | Rota | Autenticação | Descrição |
|---|---|---|---|
| POST | `/users` | Não | Cadastra um novo usuário |
| POST | `/login` | Não | Autentica e retorna um token JWT |
| GET | `/tasks` | 🔒 Sim | Lista todas as tasks |
| GET | `/tasks/:id` | 🔒 Sim | Busca uma task por ID |
| POST | `/tasks` | 🔒 Sim | Cria uma nova task |
| PUT | `/tasks/:id` | 🔒 Sim | Atualiza título e descrição de uma task |
| PATCH | `/tasks/:id/status` | 🔒 Sim | Atualiza o status de uma task |
| DELETE | `/tasks/:id` | 🔒 Sim | Exclui uma task |
