# DevMarket 🚀

Uma plataforma robusta para gestão de mercado e serviços, focada em escalabilidade e performance.

## 📌 Sobre o Projeto

O **DevMarket** é um ecossistema completo desenvolvido para conectar motoristas, usuários e gerenciar pagamentos, localizações e corridas em tempo real. O backend é construído com Node.js, utilizando uma arquitetura modular para facilitar a manutenção e evolução do sistema.

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução Javascript.
- **Express**: Framework web para construção da API.
- **WebSocket**: Comunicação em tempo real para localização e corridas.
- **PostgreSQL**: Banco de dados relacional.
- **Migrations**: Controle de versão do banco de dados.

## 📂 Estrutura de Pastas (Backend)

```text
backend/
├── src/
│   ├── config/          # Configurações de banco de dados e variáveis
│   ├── modules/         # Módulos principais do sistema
│   │   ├── auth/        # Autenticação e Autorização
│   │   ├── drivers/     # Gestão de Motoristas
│   │   ├── location/    # Serviços de Geolocalização
│   │   ├── payments/    # Processamento de Pagamentos
│   │   ├── rides/       # Gestão de Corridas
│   │   └── users/       # Gestão de Usuários
│   ├── shared/          # Código compartilhado entre módulos
│   └── websocket/       # Lógica de comunicação Socket.io/WS
├── migrations/          # Scripts de alteração do banco de dados
└── ...
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado (v16+)
- PostgreSQL rodando

### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/DriverClub.git
   ```
2. Acesse a pasta do backend:
   ```bash
   cd DevMarket/backend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure o arquivo `.env` com suas credenciais do banco de dados.
5. Rode as migrations:
   ```bash
   npm run migrate (ou o comando configurado)
   ```
6. Inicie o servidor:
   ```bash
   npm run dev
   ```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE.md](../LICENSE.md) para detalhes.

---
Desenvolvido por [Marcio Vinicius](https://github.com/seu-usuario)
