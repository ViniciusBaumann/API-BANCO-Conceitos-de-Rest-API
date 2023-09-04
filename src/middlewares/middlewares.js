const clientes = require('../data/bancodedados')

const verificarSenhaBanco = (req,res,next)=>{
    const {senha_banco} = req.query
    if(!senha_banco){
        return res.status(401).json({mensagem: "Senha é obrigatoria"})
    }else if(senha_banco !== clientes.banco.senha){
        return res.status(401).json({mensagem: "A senha do banco informada é inválida!"})
    }
    next()
}

const verificarDadosBody = (data) =>{   
    return function(req, res, next) {  
        const arrayResult = []   
        Object.entries(req.body).forEach((element)=>{
            if(data.includes(element[0])){
                if(element[1]){
                    arrayResult.push(element[0])
                }
            }
        })
        if(arrayResult.length === data.length){
            return next()
        }
        const resto = data.filter((element) => !arrayResult.includes(element));
        return res.status(400).json({mensagem:`Preencha os campos '${resto}'.`});     
    } 
}
const verificarDadosQuery = (data) =>{   
    return function(req, res, next) {  
        const arrayResult = []   
        Object.entries(req.query).forEach((element)=>{
            if(data.includes(element[0])){
                if(element[1]){
                    arrayResult.push(element[0])
                }
            }
        })
        if(arrayResult.length === data.length){
            return next()
        }
        const resto = data.filter((element) => !arrayResult.includes(element));
        return res.status(400).json({mensagem:`Preencha os campos '${resto}'.`});     
    } 
}
const verificarDadosParms = (data) =>{   
    return function(req, res, next) {  
        const arrayResult = []   
        Object.entries(req.params).forEach((element)=>{
            if(data.includes(element[0])){
                if(element[1]){
                    arrayResult.push(element[0])
                }
            }
        })
        if(arrayResult.length === data.length){
            return next()
        }
        const resto = data.filter((element) => !arrayResult.includes(element));
        return res.status(400).json({mensagem:`Preencha os campos '${resto}'.`});     
    } 
}
module.exports = {
    verificarSenhaBanco,
    verificarDadosBody,
    verificarDadosQuery,
    verificarDadosParms
}