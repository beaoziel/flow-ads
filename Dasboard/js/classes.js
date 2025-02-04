const Mercado = {
    id: Number,
    nome: String,
    cnpj: String,
    cep: String,
    logradouro: String,
    bairro: String,
    numero: Number,
    cidade: String,
    estado: String,
    representante: String,
    telefone: String,
    idAcesso: String,
    dataCadastro: Date
}

const TipoUsuario = {
    id: Number,
    descricao: String
}

const Usuario = {
    id: Number,
    email: String,
    senha: String,
    tipoUsuario: Number,
    idMercado: Number,
    dataCadastro: Date
}

const Setor = {
    id: Number,
    descricao: String,
    idMercado: Number
}

const Sensor = {
    id: Number,
    identificacao: String,
    idSetor: Number,
    dataCadastro: Date
}

const EventosSensor = {
    id: Number,
    info: Number,
    dataHoraInfo: Date,
    idSensor: Number
}

