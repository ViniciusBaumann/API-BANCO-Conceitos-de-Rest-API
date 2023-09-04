# API de Exemplo - Banco Online - Aplicação dos conceitos de Rest Api
**Um projeto piloto do sistema de um Banco Online escrito em Javascript e Node.js, usando as bibliotecas Express, Nodemon e Date-fns**

- [x] Criar conta bancária
- [x] Listar contas bancárias
- [x] Atualizar os dados do usuário da conta bancária
- [x] Excluir uma conta bancária
- [x] Depósitar em uma conta bancária
- [x] Sacar de uma conta bancária
- [x] Transferir valores entre contas bancárias
- [x] Consultar saldo da conta bancária
- [x] Emitir extrato bancário

---
# Requisitos

- [NodeJS](https://nodejs.org/)
- [Some JSON knowledge](https://www.json.org/)
  
---

**Instalação**

1. Faça o Download/Clone desse repositorio
2. Coloque tudo em um arquivo
3. Use seu editor de código preferido
4. Abra o terminal no arquivo em que salvou e digite  `npm install` no terminal

---
**Como Usar**
1. Para iniciar a api, digite no console `npm run dev`
2. Envie as requisições para a rota `http://localhost:3000`, pode ser pelo navegador, mas recomendo o uso do Insomnia ou de outro app.
3. De acordo com a mudança de rota a resposta deverá ser dada nos status, mas em *status 204* não haverá resposta enviada de volta, mas a requisição foi bem sucedida.
   
## Criar conta bancária
1. Envie pelo `Body` da pagina um objeto contendo:
   
   {
    `nome`: "STRING",
    `cpf`: "STRING",
    `data_nascimento`: "STRING",
    `telefone`: "STRING",
    `email`: "STRING",
    `senha`: "STRING"
}
3. O Sistema verificará se não há nenhuma outra conta com o mesmo cpf, email e telefone ou se está faltando algum dado.
4. Se a requisição for bem sucedida a resposta será um *Status Code 204*.
   
---
**Previews**
- Servidor Inicializado:
<img src="https://i.imgur.com/mTDV6bk.png" width="400px">
</div>

- Exemplo de Erro de Validação de Dados:
<img src="https://i.imgur.com/wojsMip.png" width="400px">
</div>

- Exemplo de requisição bem sucedida mas sem resposta(*Status code 204*):
<img src="https://i.imgur.com/a57nM4h.png" width="400px">
</div>

- Exemplo de dados necessários para criação de uma nova conta:
<img src="https://i.imgur.com/KyoPDO3.png" width="400px">
</div>
