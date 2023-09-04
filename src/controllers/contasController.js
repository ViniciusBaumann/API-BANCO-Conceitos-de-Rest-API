let { saques, contas, depositos, transferencias } = require('../data/bancodedados')
const { format } = require('date-fns')

//Retorna o Index da conta
const encontrarContaPorNumero = async (numero) =>{
    return contas.findIndex((conta)=> conta.numero === numero)
}

//Retorna data no formato correto a ser apresentado
const dataFormatada = () =>{
    const newDate = new Date()
    const dataFormat = format(newDate, "yyyy-MM-dd HH:mm:ss")
    return dataFormat
}

//Retorna um array vazio se nao houver outra conta com o mesmo cpf/email
const validacaoCpf_Email = async (cpf,email) =>{
    return contas.find(conta =>  conta.usuario.cpf === cpf || conta.usuario.email === email)
}

const listarTodasContas = async (req,res) => {
    if(contas.length === 0){
        return res.status(204).json(contas)
    }    
    return res.status(200).json(contas)
}

const criarContaBancaria = async (req,res)=>{
    let numero = contas.length
    let conta = {}
    const {cpf,email} = req.body

    const validacao = await validacaoCpf_Email(cpf,email)

    if(validacao){
        return res.status(400).json({mensagem: "Já existe uma conta com o mesmo nome, cpf ou e-mail informado!"})
    }else{
        conta = {
            numero: ++numero,
            saldo: 0,
            usuario: {...req.body}
        }
        contas.push(conta)
        return res.status(201).json()
    }
}

const atualizarContaUsuario = async (req,res) =>{
    let contaArray = {}
    const {numeroConta} = req.params
    const {cpf,email} = req.body

    const validacao = await validacaoCpf_Email(cpf,email)

    if(validacao){
        return res.status(400).json({mensagem: "Já existe uma conta com o mesmo nome, cpf ou e-mail informado!"})
    }else{
        contaArray = {
            ...req.body
        }
        contas[numeroConta-1].usuario = contaArray
        return res.status(204).json()
    }
}

const excluirContaUsuario = async (req,res) =>{
    const {numeroConta} = req.params
    const contaIndex = await encontrarContaPorNumero(Number(numeroConta))

    if(contas[contaIndex].saldo != 0){
        return res.status(400).json({mensagem: 'A conta só pode ser removida se o saldo for zero!'})
    }

    contas = contas.filter((conta)=> conta.numero != Number(numeroConta))
    return res.status(204).json()
}

const depositarSaldo = async (req,res) =>{
    const {numero_conta, valor} = req.body
    const dataFormat = dataFormatada()

    if(Number(valor) < 0){
        return res.status(400).json({mensagem: 'O valor nao pode menor do que zero!'})
    }

    const contaIndex = await encontrarContaPorNumero(Number(numero_conta))
    if(contaIndex < 0){
        return res.status(404).json({mensagem: 'A conta nao existe'});
    }else{
        contas[contaIndex].saldo = contas[contaIndex].saldo + Number(valor)
        depositos.push({
            data: dataFormat,
            ...req.body
        })
        return res.status(204).json()
    }
}

const sacarSaldo = async(req,res) =>{
    const {numero_conta, valor, senha} = req.body
    const dataFormat = dataFormatada()

    if(Number(valor) <= 0){
        return res.status(400).json({mensagem: 'O valor nao pode ser zero ou menor do que zero!'})
    }

    const contaIndex = await encontrarContaPorNumero(Number(numero_conta))
    if(contaIndex < 0){
        return res.status(404).json({mensagem: 'A conta nao existe!'});
    }else if(contas[contaIndex].usuario.senha != senha){
        return res.status(401).json({mensagem: 'Senha da Conta Incorreta!'});
    }else if(contas[contaIndex].saldo < Number(valor)){
        return res.status(401).json({mensagem: 'Saldo Insuficiente!'}); 
    }else{
        contas[Number(numero_conta)-1].saldo = contas[Number(numero_conta)-1].saldo - Number(valor)
        saques.push({
            data: dataFormat,
            ...req.body
        })
        return res.status(204).json()
    }
}

const tranferirSaldo = async (req,res) =>{
    const dataFormat = dataFormatada()
    const {numero_conta_origem, numero_conta_destino, valor, senha} = req.body

    if(Number(valor) <= 0){
        return res.status(400).json({mensagem: 'O valor nao pode ser zero ou menor do que zero!'})
    }

    const conta1Index = await encontrarContaPorNumero(Number(numero_conta_origem))
    const conta2Index = await encontrarContaPorNumero(Number(numero_conta_destino))

    if(conta1Index < 0 || conta2Index < 0){
        return res.status(404).json({mensagem: 'Uma ou Ambas das contas nao existe!'})
    }else if(contas[conta1Index].usuario.senha != senha){
        return res.status(401).json({mensagem: 'Senha da conta Incorreta!'});
    }else if(contas[conta1Index].saldo < Number(valor)){
        return res.status(401).json({mensagem: 'Saldo Insuficiente!'}); 
    }else if(conta1Index === conta2Index){
        return res.status(401).json({mensagem: 'Nao é possivel transferir para a mesma conta'}); 
    }else{
        contas[conta2Index].saldo = contas[conta2Index].saldo + Number(valor)
        contas[conta1Index].saldo = contas[conta1Index].saldo - Number(valor)
        transferencias.push({
            data: dataFormat,
            ...req.body
        })
        return res.status(204).json()
    }
}

const consultarSaldo = async (req,res)=>{
    const {numero_conta, senha} = req.query

    const contaIndex = await encontrarContaPorNumero(Number(numero_conta))
    if(contaIndex < 0){
        return res.status(404).json({mensagem: 'Conta nao encontrada!'})
    }else if(contas[contaIndex].usuario.senha != senha){
        return res.status(401).json({mensagem: 'Senha da conta Incorreta!'});
    }else{
        return res.status(200).json({saldo: contas[contaIndex].saldo})
    }
}

const consultarExtrato = async (req,res) =>{
    const {numero_conta, senha} = req.query

    const contaIndex = await encontrarContaPorNumero(Number(numero_conta))
    if(contaIndex < 0){
        return res.status(404).json({mensagem: 'Conta nao encontrada!'})
    }else if(contas[contaIndex].usuario.senha != senha){
        return res.status(401).json({mensagem: 'Senha da conta Incorreta!'});
    }else{
        const saque = saques.filter((saque)=> saque.numero_conta === numero_conta)
        const deposito = depositos.filter((deposito)=> deposito.numero_conta === numero_conta)
        const transferenciasRecebidas = transferencias.filter((transferencia)=> transferencia.numero_conta_destino === numero_conta)
        const transferenciasEnviadas = transferencias.filter((transferencia)=> transferencia.numero_conta_origem === numero_conta)
        
        const arrayExtrato = {
            saque,
            deposito,
            transferenciasRecebidas,
            transferenciasEnviadas,
        }
        return res.status(200).json(arrayExtrato)
    }
}

module.exports = {
    listarTodasContas,
    criarContaBancaria,
    atualizarContaUsuario,
    excluirContaUsuario,
    depositarSaldo,
    sacarSaldo,
    tranferirSaldo,
    consultarSaldo,
    consultarExtrato
}


// 200 (OK) = requisição bem sucedida
// 201 (Created) = requisição bem sucedida e algo foi criado
// 204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta
// 400 (Bad Request) = o servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
// 401 (Unauthorized) = o usuário não está autenticado (logado)
// 403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado
// 404 (Not Found) = o servidor não pode encontrar o recurso solicitado
// 500 (Internal Server Error) = falhas causadas pelo servidor