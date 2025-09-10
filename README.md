<p align="center">
  <a href="" target="blank"><img src="https://raw.githubusercontent.com/Nyffi/mvg-game/refs/heads/main/public/bleize-dark.png" width="320" alt="Nest Logo" /></a>
</p>


**Backend com autorização feito no Nest.js**

Este repositório contém o backend do projeto MVG, desenvolvido com **NestJS** e TypeScript, responsável por oferecer endpoints seguros para jogos, saldo, produtos e checkout.

---

##  Documentação

### 1. Como rodar localmente

**Pré-requisitos**
- Node.js >= 18
- npm, yarn, pnpm ou bun
- MongoDB

**Passos**

#### Clone o repositório
git clone https://github.com/Nyffi/mvg-backend.git
cd mvg-backend

#### Instale as dependências
npm install
#### ou
yarn install
#### ou
pnpm install
#### ou
bun install

#### Crie um projeto no Google Cloud
Vá no [Google Cloud Console](https://console.cloud.google.com/apis/credentials) e em Credenciais, crie um novo cliente OAuth2.0

Em "Origens JavaScript autorizadas", coloque as URLs do mvg-game e mvg-backend. Por padrão, são:
```
http://localhost:3000
http://localhost:5000
```

E em "URIs de redirecionamento autorizados", coloque:
```
http://localhost:5000/auth/google/callback
```

Completando isso, você receberá um ID e um Secret do cliente OAuth2.0.

#### Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

#### Rode o servidor de desenvolvimento

```
npm run dev
```
Acesse a API em http://localhost:5000

# ⚙️ Variáveis de Ambiente

Exemplo de arquivo .env.example:

```
# Chave usada para assinar/verificar JWTs (mesma do mvg-game)
JWT_SECRET=changeme123

# URL de conexão com o banco de dados
MONGODB_URI=mongodb+srv://...

# ID de client do Google
GOOGLE_CLIENT_ID=id-client-google

# Secret de client do Google
GOOGLE_CLIENT_SECRET=secret-client-google

# URL de callback depois que logar com o Google
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

# Porta onde o Nest vai rodar (a porta 5000 é recomendada para evitar conflito)
PORT=5000

# URL de redirecionamento pós-autenticação
APP_URL="http://localhost:3000"
```

Copie este arquivo para .env e ajuste os valores conforme sua configuração.
# Endpoints principais

Este backend expõe endpoints principais para autenticação e funcionalidades do jogo, como:
```
Endpoint	        Método	Descrição
/auth/google	        GET	Redireciona para a página de login do Google
/auth/google/callback	GET	Pega/cria os dados do usuário, gera um JWT e redireciona para APP_URL
```

Nota: Os endpoints podem ser ajustados conforme evolução do backend. Revise a pasta src para confirmações mais precisas.

# Como funciona a integração entre os sistemas

O frontend ([Nyffi/mvg-game](https://github.com/Nyffi/mvg-game)) envia o usuário sem autenticação para a rota /auth/google.

O google faz o callback com os dados do usuário na rota /auth/google/callback, e faz uma pesquisa no MongoDB. Caso o usuário não exista, é criado um registro novo com os dados obtidos, depois é feito um JWT e enviado como parâmetro para APP_URL.


# Decisões Técnicas de Arquitetura

#### NestJS (TypeScript)
Estrutura escalável, modular e baseada em injeção de dependências.

#### JWT para autenticação
Simples e eficiente para comunicação entre frontend e backend, e permite que SSO seja implementado.

#### Estrutura modular
Separação clara entre módulos (Auth, Game, Users, Products, Checkout).

#### Docker
Usado para conteinerizar o projeto para ser publicado no Render


# Limitações conhecidas

#### Persistência de dados
Sem MONGODB_URI configurado, os dados não serão armazenados de forma alguma.

#### Funcionalidades incompletas
Originalmente era para fornecer dados para o e-commerce e também ser usado como servidor de autenticação.

#### Tokens JWT
Sem refresh tokens como padrão, possível expiração abrupta.

#### Escalabilidade limitada
Em ambiente de alta carga, pode exigir refatoração (por exemplo, extração de módulos em microservices).

#### Testes incompletos
Nenhuma das rotas utilizada é testada de fato