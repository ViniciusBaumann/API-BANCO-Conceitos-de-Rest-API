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
   
**Criar conta bancária**
1. Envie pelo método `POST` na rota `/contas` pelo `Body` da pagina um objeto contendo:
   
   {
    `nome`: "STRING",
    `cpf`: "STRING",
    `data_nascimento`: "STRING",
    `telefone`: "STRING",
    `email`: "STRING",
    `senha`: "STRING"
}
3. O Sistema verificará se não há nenhuma outra conta com o mesmo cpf e email ou se está faltando algum dado.
4. Se a requisição for bem sucedida a resposta será um *Status Code 204*.

**Listar contas bancárias**
1. Faça a requisição pelo método `GET` na rota `/contas?senha_banco=Cubos123Bank`.
2. Lembrando que `?senha_banco=Cubos123Bank` é obrigatório, usado para verificar se o usuario pertence ao banco para poder listar todas as contas.

**Atualizar os dados do usuário da conta bancária**
1. Envie pelo método `PUT` na rota `/contas/:NumeroCONTA`.
2. Pelo `Body` da pagina um objeto contendo:
  
   {
    `nome`: "STRING",
    `cpf`: "STRING",
    `data_nascimento`: "STRING",
    `telefone`: "STRING",
    `email`: "STRING",
    `senha`: "STRING"
}
3. Pelo `Query` `:NumeroCONTA` digite o numero da conta que deve ser alterada.
4. O Sistema verificará se não há nenhuma outra conta com o mesmo cpf e email ou se está faltando algum dado.
5. Se a requisição for bem sucedida a resposta será um *Status Code 204*.

**Excluir uma conta bancária**

1. Envie pelo método `DELETE` na rota `/contas/:NumeroCONTA`:
2. Em `:NumeroCONTA` digite o numero da conta que deve ser excluida.
obs: A conta não deve ter saldo para ser excluida.

**Depósitar em uma conta bancária**
1. Envie pelo método `POST` na rota `/transacoes/depositar` pelo `Body` da pagina um objeto contendo:
   
    {
  `numero_conta`: "STRING",
	`valor`: NUMBER
}
2. Se a requisição for bem sucedida a resposta será um *Status Code 204*.

**Sacar de uma conta bancária**
1. Envie pelo método `POST` na rota `/transacoes/sacar` pelo `Body` da pagina um objeto contendo:

   {
	`numero_conta`: "STRING",
	`valor`: NUMBER,
  `senha`: "STRING"
}
2. A senha deve bater com a senha da conta
3. Se a requisição for bem sucedida a resposta será um *Status Code 204*.

**Transferir valores entre contas bancárias**
1. Envie pelo método `POST` na rota `/transacoes/transferir` pelo `Body` da pagina um objeto contendo:
   {
	`numero_conta_origem`: "STRING",
	`numero_conta_destino`: "STRING",
	`valor`: NUMBER,
	`senha`: "STRING"
}
2. Se a requisição for bem sucedida a resposta será um *Status Code 204*.

**Consultar saldo da conta bancária**
1. Para consultar saldo, envie uma requisição pelo metodo `GET` pela rota `/contas/saldo?numero_conta=X&senha=Y` onde *X* é o numero da conta e *Y* é a senha.
2. Se a requisição for bem sucedida a resposta será um objeto contendo o saldo da conta *X*.

**Emitir extrato bancário**
1. Para emitir extrato, envie uma requisição pelo metodo `GET` pela rota `/contas/extrato?numero_conta=X&senha=Y` onde *X* é o numero da conta e *Y* é a senha.
2. Se a requisição for bem sucedida a resposta será um objeto contendo o saldo da conta *X*.
   
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
