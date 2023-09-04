const express = require('express')
const { verificarSenhaBanco, verificarDadosBody, verificarDadosQuery, verificarDadosParms } = require('../middlewares/middlewares')
const controller = require('../controllers/contasController')

const routes = express.Router()

routes.get(`/`, (req,res)=>{
    res.status(201).json({mensagem: 'Server Online!'})
})

routes.get('/contas', verificarSenhaBanco, controller.listarTodasContas)
routes.post('/contas', verificarDadosBody(['nome','cpf','data_nascimento','telefone','email','senha']), controller.criarContaBancaria)
routes.put(`/contas/:numeroConta/usuario`, verificarDadosBody(['nome','cpf','data_nascimento','telefone','email','senha']), verificarDadosParms(['numeroConta']),controller.atualizarContaUsuario)
routes.delete(`/contas/:numeroConta`, verificarDadosParms(['numeroConta']),controller.excluirContaUsuario)
routes.post('/transacoes/depositar',verificarDadosBody(['numero_conta','valor']), controller.depositarSaldo)
routes.post('/transacoes/sacar', verificarDadosBody(['numero_conta', 'valor', 'senha']), controller.sacarSaldo)
routes.post('/transacoes/transferir', verificarDadosBody(['numero_conta_origem', 'numero_conta_destino', 'valor', 'senha']), controller.tranferirSaldo)
routes.get('/contas/saldo', verificarDadosQuery(['numero_conta', 'senha']), controller.consultarSaldo)
routes.get('/contas/extrato', verificarDadosQuery(['numero_conta', 'senha']), controller.consultarExtrato)

module.exports= routes