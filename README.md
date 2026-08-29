# Task Tracker API

API REST para gerenciamento de tarefas (to-do list), com autenticação via JWT.

<br>

🔗 **Frontend:** [Task-Traker-Front](https://github.com/giovannacostaxavier/Task-Tracker-Front)

🚀 **Projeto online:** [Acessar aplicação](https://task-tracker-front.vercel.app/)
<br>


## 🚀 Stack utilizada

- Node.js
- TypeScript
- Express
- PostgreSQL via `pg`
- JWT via `jsonwebtoken`
- bcrypt para hash de senhas
- Zod para validação de dados

<br>

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/giovannacostaxavier/Task-Traker-Back.git
```

Entre na pasta:

```bash
cd Task-Traker-Back
```

Instale as dependências:

```bash
npm install
```

<br>

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

> `PORT` é opcional. Se não for definida, a API utiliza a porta `3000` por padrão.

<br>

## ▶️ Rodando o projeto

Para executar em desenvolvimento:

```bash
npm run dev
```

A API utiliza a porta `3000` por padrão.

<br>

## 📦 Build e execução

Para gerar a versão compilada:

```bash
npm run build
```

Para executar a versão compilada:

```bash
npm start
```

<br>

## 🔐 Autenticação

A API utiliza JWT (JSON Web Token).

Após o login, um token é retornado e deve ser enviado no header `Authorization` nas rotas protegidas:

```http
Authorization: Bearer <seu_token_aqui>
```

As rotas marcadas com 🔒 exigem autenticação.

Caso o token não seja enviado ou seja inválido ou expirado, a API retorna:

```text
401 Unauthorized
```

<br>

## 📚 Endpoints

### 👤 Usuários

#### Cadastrar usuário

```http
POST /users
```

Body:

```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "senha": "senha123"
}
```

Validações:

| Campo | Regra |
|---|---|
| `nome` | obrigatório |
| `email` | obrigatório e deve possuir formato válido |
| `senha` | obrigatória, mínimo de 6 caracteres |

Resposta — `201 Created`:

```json
{
  "id": 1,
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "criado_em": "2026-08-21T12:00:00.000Z"
}
```

Erros possíveis:

| Status | Motivo |
|---|---|
| `400` | Dados inválidos |

<br>

### 🔑 Login

#### Autenticar usuário

```http
POST /login
```

Body:

```json
{
  "email": "maria@email.com",
  "senha": "senha123"
}
```

Validações:

| Campo | Regra |
|---|---|
| `email` | obrigatório e deve possuir formato válido |
| `senha` | obrigatória |

Resposta — `200 OK`:

```json
{
  "token": "seu_token_jwt"
}
```

Erros possíveis:

| Status | Motivo |
|---|---|
| `400` | Dados inválidos |
| `401` | Credenciais inválidas |

<br>

### 📋 Tasks 🔒

Todas as rotas abaixo exigem autenticação.

#### Listar todas as tasks

```http
GET /tasks
```

Resposta — `200 OK`:

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

<br>

#### Buscar task por ID

```http
GET /tasks/:id
```

Parâmetros de URL:

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `id` | string | ID da task |

Resposta — `200 OK`:

```json
{
  "id": 1,
  "titulo": "Estudar Node.js",
  "descricao": "Revisar módulos ES",
  "status": "todo",
  "user_id": 1
}
```

Erros possíveis:

| Status | Motivo |
|---|---|
| `404` | Task não encontrada |

<br>

#### Criar task

```http
POST /tasks
```

Body:

```json
{
  "titulo": "Estudar Node.js",
  "descricao": "Revisar módulos ES"
}
```

Validações:

| Campo | Regra |
|---|---|
| `titulo` | obrigatório |
| `descricao` | opcional |

> O `user_id` é definido automaticamente a partir do usuário autenticado.

Resposta — `201 Created`:

```json
{
  "id": 2,
  "titulo": "Estudar Node.js",
  "descricao": "Revisar módulos ES",
  "status": "todo",
  "user_id": 1
}
```

Erros possíveis:

| Status | Motivo |
|---|---|
| `400` | Título ausente |

<br>

#### Atualizar task

```http
PUT /tasks/:id
```

Parâmetros de URL:

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `id` | string | ID da task |

Body:

```json
{
  "titulo": "Estudar TypeScript",
  "descricao": "Revisar tipos avançados"
}
```

Validações:

| Campo | Regra |
|---|---|
| `titulo` | obrigatório |
| `descricao` | opcional |

Resposta — `200 OK`:

```json
{
  "id": 2,
  "titulo": "Estudar TypeScript",
  "descricao": "Revisar tipos avançados",
  "status": "todo",
  "user_id": 1
}
```

Erros possíveis:

| Status | Motivo |
|---|---|
| `400` | Título ausente |
| `404` | Task não encontrada |

<br>

#### Atualizar status da task

```http
PATCH /tasks/:id/status
```

Parâmetros de URL:

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `id` | string | ID da task |

Body:

```json
{
  "status": "doing"
}
```

Valores permitidos:

```text
todo
doing
done
```

Validações:

| Campo | Regra |
|---|---|
| `status` | obrigatório; deve ser `todo`, `doing` ou `done` |

Resposta — `200 OK`:

```json
{
  "id": 2,
  "titulo": "Estudar TypeScript",
  "descricao": "Revisar tipos avançados",
  "status": "doing",
  "user_id": 1
}
```

Erros possíveis:

| Status | Motivo |
|---|---|
| `400` | Status inválido |
| `404` | Task não encontrada |

<br>

#### Excluir task

```http
DELETE /tasks/:id
```

Parâmetros de URL:

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `id` | string | ID da task |

Resposta:

```text
204 No Content
```

Erros possíveis:

| Status | Motivo |
|---|---|
| `404` | Task não encontrada |

<br>

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

<br>

## ⚠️ Tratamento de erros

Erros inesperados retornam:

```text
500 Internal Server Error
```

Exemplo:

```json
{
  "erro": "Erro interno do servidor"
}
```
