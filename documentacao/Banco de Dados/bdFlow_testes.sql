create database bdFlow;

use bdFlow; 

-- CREATE de todas as tabelas - Início 
create table tbMercado(
cod_mercado int primary key auto_increment,
nome varchar(35) not null,
cnpj varchar(18) not null,
cep varchar(10) not null,
logradouro varchar(35) not null,
bairro varchar(25) not null,
num_estabelecimento varchar(10) not null,
cidade varchar(25) not null,
estado varchar(20) not null,
nome_representante varchar(30) not null,
num_telefone varchar(14) not null,
id_acesso varchar(10) not null, 
data_cadastro timestamp default current_timestamp() not null
)auto_increment = 1;

create table tbSetor(
cod_setor int primary key auto_increment,
descricao varchar(30),
cod_mercado int not null,
foreign key(cod_mercado) references tbMercado(cod_mercado)
);


create table tbSensor(
cod_sensor int primary key auto_increment,
identificacao varchar(20),
cod_setor int not null,
foreign key (cod_setor) references tbSetor(cod_setor),
data_cadastro timestamp default current_timestamp() not null
);


create table tbEventos_Sensor(
cod_eventos int primary key auto_increment,
info_sensor int(1),
data_hora_info timestamp default current_timestamp() not null,
cod_sensor int not null,
foreign key (cod_sensor) references tbSensor(cod_sensor)
);

create table tbTipo_Usuario(
cod_tipo_usuario int primary key auto_increment,
descricao varchar(14) not null
);

create table tbUsuario(
cod_usuario int primary key auto_increment,
email varchar(35) not null, 
senha varchar(15) not null,
cod_tipo_usuario int not null,
foreign key (cod_tipo_usuario) references tbTipo_Usuario(cod_tipo_usuario),
cod_mercado int,
foreign key (cod_mercado) references tbMercado(cod_mercado),
data_cadastro timestamp default current_timestamp() not null
);
-- CREATE de todas as tabelas - Fim 

-- INSERT de todas as tabelas - Início 
-- tbMercado
insert into tbMercado(nome, cnpj, cep, logradouro, bairro, num_estabelecimento, cidade, estado,
					  nome_representante, num_telefone, id_acesso) 
                      
values ('Carrefour', '08.740.658/0001-41', '08260-000', 'Av. Jacu Pêssego', 'Itaquera', '1254', 
                     'São Paulo', 'SP', 'Rafael dos Santos', '(11) 2345-2342', '0f67df'),
        
        ('Carrefour Express Shopping Itaquera', '48.570.753/0001-69', '08220-900', 'Av. José Pinheiro Borges', 'Itaquera', 's/n', 
        'São Paulo', 'SP', 'Daiane Souza Silva','(11) 6856-6456', '06e3e9'),
        
        ('Extra Hipermercado', '64.379.191/0001-27', '01317-001', 'Av. Brigadeiro Luís Antônio', 'Bela Vista', '2013', 
        'São Paulo', 'SP', 'Daniele Nogueira', '(11) 2545-0931', '33ca88'),
        
        ('Lojas Americanas', '61.179.784/0001-51', '03568-010', 'R. Dr. Campos Moura', 'Parque Artur Alvim', '311 ',
        'Rio Grande do Norte', 'RN', 'Joaquim Soares Oliveira','(43) 5675-3245', '2659c3'),
        
        ('Mercado Extra - Belém', '87.309.183/0001-00', '03057-040', 'Largo São José do Belém', 'R. Belém', '23 ',
        'Mato grosso do sul', 'MS', 'Joaquim Soares Oliveira','(43) 5675-3245', '072785');
-- tbMercado

-- tbSetor - Um mercado pode ter mais de um setor
insert into tbSetor (descricao,cod_mercado)
values ('Entrada', 1),
	   ('Estacionamento',1),
       ('Entrada_2', 1),
       ('Saída',3),
       ('Entrada', 3),
       ('Saída_2', 3),
       ('Corredor_1', 4),
       ('Corredor_2', 4);
-- tbSetor

-- tbSensor -- Um setor pode ter mais de um sensor
insert into tbSensor(identificacao, cod_setor)

values ('A1_Entrada', 1), ('A2_Entrada', 1), ('A3_Entrada', 1), ('A4_Entrada', 1), ('A5_Estacionamento', 2), ('A6_Estacionamento', 2),
	   ('A1_Estacionamento', 2), ('A2_Estacionamento', 2), ('A3_Entrada_2', 3), ('A4_Entrada_2', 3), ('A5_Entrada_2', 3), ('A6_Entrada_2', 3),
       ('A1_Saída', 4), ('A2_Saída', 4), ('A3_Saída', 4), ('A4_Saída', 4), ('A5_Entrada', 5), ('A6_Entrada', 5),
       ('A1_Entrada', 5), ('A2_Entrada', 5), ('A3_Saída_2', 6), ('A4_Saída_2', 6), ('A5_Saída_2', 6), ('A6_Saída_2', 6),
	   ('A1_Corredor_1', 7), ('A2_Corredor_1', 7), ('A3_Corredor_1', 7), ('A4_Corredor_1', 7), ('A1_Corredor_2', 8), ('A2_Corredor_2', 8), 
       ('A3_Corredor_2', 8), ('A4_Corredor_2', 8);
-- tbSensor

-- tbEvento_Sensor - Um sensor pode ter de um evento
insert into tbEventos_Sensor(info_sensor, cod_sensor)

values (1,4), (1,4), (1,10), (1,8), (1,4), (1,3),
       (1,1), (1,8), (1,8), (1,4), (1,4), (1,8),
       (1,12), (1,20), (1,12), (1,12), (1,8), (1,12),
       (1,20), (1,12), (1,6), (1,26), (1,1), (1,4),
	   (1,1), (1,4), (1,7), (1,9), (1,19), (1,22),
       (1,9), (1,14), (1,27), (1,23), (1,12), (1,11);

-- tbEvento_Sensor

-- tbTipo_Usuario
insert into tbTipo_Usuario(descricao)
values ('Administrador'), ('Cliente');
-- tbTipo_Usuario

-- tbUsuario 
-- O tipo usuário 'Administrador(1)' não está relacionado a nenhum mercado por isso o 'cod_mercado' está 'null'
insert into tbUsuario(email, senha, cod_tipo_usuario, cod_mercado)

values ('flow_contato@gmail.com.br', 'jeejdkjava', 1, null),
	   ('adm_flow@gmail.com.br', 'jeejdkjava', 1, null),
       ('ana.cristina@gmail.com.br', 'eclipseje', 2, 2),
       ('lucas.silva@gmail.com.br', 'visualstudio', 2, 3),
       ('camila.silva@gmail.com.br', 'eclipseee', 2, 3),
       ('taina.oliveira@gmail.com.br', 'netbeans', 2, 3),
       ('daiane.santos@gmail.com.br', 'vscode', 2, 5);

-- tbUsuario
        
-- INSERT de todas as tabelas - Fim 

-- SELECT de todas as tabelas - Início 
select * from tbMercado;
select * from tbSetor;
select * from tbSensor;
select * from tbEventos_Sensor;
select * from tbTipo_Usuario;
select * from tbUsuario;
-- SELECT de todas as tabelas - Fim 


-- Select com ALIAS de todas as tabelas - Início
-- tbMercado - Normal
select cod_mercado as 'Código', nome as 'Nome', cnpj as 'CNPJ', cep as 'CEP', logradouro as 'Logradouro',
	   bairro as 'Bairro', num_estabelecimento as 'Núm. Estabelecimento', cidade as 'Cidade', estado as 'Estado' ,
       nome_representante as 'Representante', num_telefone as 'Telefone Fix.', id_acesso 'ID Acesso', 
       data_cadastro as 'Data cadastro'  from tbMercado as m;
-- tbMercado

-- tbSetor - Normal
select s.descricao as 'Setor', m.nome as 'Mercado', s.cod_mercado as 'Código Mercado' from tbSetor as s, tbMercado as m 
                   where s.cod_mercado = m.cod_mercado;
-- tbSetor

-- tbSetor -- Buscando setores de um mercado específico
select s.descricao as 'Setor', m.nome as 'Mercado', s.cod_mercado as 'Código Mercado' from tbSetor as s, tbMercado as m 
                   where s.cod_mercado =  3 and s.cod_mercado = m.cod_mercado;
-- tbSetor


-- tbSensor -- buscando dados das tabelas sensor, setor e mercado
select s.cod_sensor as 'Código-Sensor', s.identificacao as 'Identificação-Sensor', se.descricao as 'Setor', m.nome as 'Mercado',
	   s.data_cadastro as 'Data Cadastro' from tbSensor as s, tbSetor as se, tbMercado as m where s.cod_setor = se.cod_setor and se.cod_mercado = m.cod_mercado;
-- tbSensor

-- tbSensor - Buscando sensores de um mercado específico
select s.cod_sensor as 'Código-Sensor', s.identificacao as 'Identificação-Sensor', se.descricao as 'Setor', m.nome as 'Mercado',
	   s.data_cadastro as 'Data Cadastro' from tbSensor as s, tbSetor as se, tbMercado as m where se.cod_mercado = 1 and se.cod_mercado = m.cod_mercado 
       and s.cod_setor = se.cod_setor;
-- tbSensor

-- tbSensor - Buscando sensores de um mercado e setor específico 
select s.cod_sensor as 'Código-Sensor', s.identificacao as 'Identificação-Sensor', se.descricao as 'Setor', m.nome as 'Mercado',
	   s.data_cadastro as 'Data Cadastro' from tbSensor as s, tbSetor as se, tbMercado as m where se.cod_mercado = 4 and  s.cod_setor = 8 
       and se.cod_mercado = m.cod_mercado and s.cod_setor = se.cod_setor;
-- tbSensor


-- tbSensor - Buscando todos os sensores de um mercado específico, pelo nome do mercado
select s.cod_sensor as 'Código-Sensor', s.identificacao as 'Identificação-Sensor', m.nome as 'Mercado',
	   s.data_cadastro as 'Data Cadastro' from tbSensor as s, tbSetor as se, tbMercado as m where m.nome = 'Extra Hipermercado'
       and se.cod_mercado = m.cod_mercado and s.cod_setor = se.cod_setor;
-- tbSensor

-- tbEvento_Sensor -  Normal
select ev.cod_eventos as 'Cod. Eventos do Sensor', ev.info_sensor as 'Informação recebida', ev.data_hora_info as 'Data/Hora do evento', 
       ev.cod_sensor as 'Código-Sensor', s.identificacao as 'Identificação-Sensor' from tbEventos_Sensor as ev, tbSensor as s
       where ev.cod_sensor = s.cod_sensor order by ev.cod_eventos asc;
-- tbEvento_Sensor

-- tbEvento_Sensor -  Buscando informações dos eventos e o nome do mercado
select ev.cod_eventos as 'Cod. Eventos do Sensor', ev.info_sensor as 'Informação recebida', ev.data_hora_info as 'Data/Hora do evento', 
       ev.cod_sensor as 'Código-Sensor', s.identificacao as 'Identificação-Sensor', m.nome as 'Mercado' from tbEventos_Sensor as ev,
       tbSensor as s, tbSetor as se, tbMercado as m where ev.cod_sensor = s.cod_sensor and s.cod_setor = se.cod_setor and m.cod_mercado = se.cod_mercado;s
-- tbEvento_Sensor

-- tbEvento_Sensor - Buscando eventos de um sensor específico
select ev.cod_eventos as 'Cod. Eventos do Sensor', ev.info_sensor as 'Informação recebida', ev.data_hora_info as 'Data/Hora do evento', 
       ev.cod_sensor as 'Código-Sensor', s.identificacao as 'Identificação-Sensor', m.nome as 'Mercado' from tbEventos_Sensor as ev, 
       tbSensor as s, tbSetor as se, tbMercado as m where ev.cod_sensor = s.cod_sensor and s.cod_setor = se.cod_setor
       and m.cod_mercado = se.cod_mercado and ev.cod_sensor = 11;
-- tbEvento_Sensor

-- tbEvento_Sensor - Buscando eventos de um mercado específico
select ev.cod_eventos as 'Cod. Eventos do Sensor', ev.info_sensor as 'Informação recebida', ev.data_hora_info as 'Data/Hora do evento', 
       ev.cod_sensor as 'Código-Sensor', s.identificacao as 'Identificação-Sensor', m.nome as 'Mercado' from tbEventos_Sensor as ev, 
       tbSensor as s, tbSetor as se, tbMercado as m where ev.cod_sensor = s.cod_sensor and s.cod_setor = se.cod_setor and m.cod_mercado = se.cod_mercado 
       and m.cod_mercado = 1 order by ev.cod_eventos asc;
-- tbEvento_Sensor

-- tbTipo_Usuario
select cod_tipo_usuario as 'Cod. Tipo usuário' , descricao as 'Descrição' from tbTipo_Usuario;
-- tbTipo_Usuario

-- tbUsuário - Buscando informações dos usuários 
select u.cod_usuario as 'Cod. Usuário', u.email as 'E-mail', u.senha as 'Senha', tu.descricao as 'Descrição', 
       cod_mercado as 'Cod. mercado'from tbUsuario as u, tbtipo_usuario as tu where u.cod_tipo_usuario = tu.cod_tipo_usuario;
-- tbUsuário       

-- tbUsuário - Buscando informações dos usuários 'Clientes' e dos mercados
select u.cod_usuario as 'Cod. Usuário', u.email as 'E-mail', u.senha as 'Senha', tu.descricao as 'Descrição', 
       m.nome as 'Mercado' from tbUsuario as u, tbtipo_usuario as tu, tbMercado as m where u.cod_tipo_usuario = tu.cod_tipo_usuario 
       and m.cod_mercado = u.cod_mercado;
-- tbUsuário       

-- Select com ALIAS de todas as tabelas - Fim







-- ===============================================

-- EM CASO DE ERROS, UTILIDADES:

-- Aumentando o tamanho de um campo
-- alter table tbMercado modify nome varchar(35);
-- alter table tbMercado modify logradouro varchar(35);
-- alter table tbUsuario modify cod_mercado int;
-- alter table tbSensor modify identificacao varchar(20);

-- Alterando nome da tabela
-- rename table tb_Eventos_Sensor to tbEventos_Sensor;

-- Altera o nome da coluna
-- alter table tbMercado change nome_respresentante nome_representante varchar(30) not null;

-- Alterando registro
-- update tbUsuario set cod_tipo_usuario = 1 where cod_usuario = 2;