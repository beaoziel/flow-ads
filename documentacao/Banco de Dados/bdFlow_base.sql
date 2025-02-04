create database bdFlow_base;

use bdFlow_base;

-- É preciso lembrar que devemos criar as tabelas com base na hierarquia 
-- Ex: se a tabela X necessita de uma tabela Y pra exisir então nós criamos primeiro a Y 
-- em seguida criamos a X e relacionamos a tabela X a tabela Y

-- CREATE de todas as tabelas - Início 
create table tbMercado(
cod_mercado int primary key auto_increment,
nome varchar(35),
cnpj varchar(18),
cep varchar(10),
logradouro varchar(35),
bairro varchar(25),
num_estabelecimento varchar(10),
cidade varchar(25),
estado varchar(20),
nome_representante varchar(30),
num_telefone varchar(14),
id_acesso varchar(10), 
data_cadastro date
)auto_increment = 1;

create table tbSetor(
cod_setor int primary key auto_increment,
descricao varchar(30),
cod_mercado int,
foreign key(cod_mercado) references tbMercado(cod_mercado)
);


create table tbSensor(
cod_sensor int primary key auto_increment,
identificacao varchar(20),
cod_setor int,
foreign key (cod_setor) references tbSetor(cod_setor),
data_cadastro date 
);


create table tbEventos_Sensor(
cod_eventos int primary key auto_increment,
info_sensor int(1),
data_hora_info datetime,
cod_sensor int,
foreign key (cod_sensor) references tbSensor(cod_sensor)
);

create table tbTipo_Usuario(
cod_tipo_usuario int primary key auto_increment,
descricao varchar(14) 
);

create table tbUsuario(
cod_usuario int primary key auto_increment,
email varchar(35), 
senha varchar(15),
cod_tipo_usuario int ,
foreign key (cod_tipo_usuario) references tbTipo_Usuario(cod_tipo_usuario),
cod_mercado int,
foreign key (cod_mercado) references tbMercado(cod_mercado),
data_cadastro date 
);
-- CREATE de todas as tabelas - Fim 


-- tbMercado
insert into tbMercado(nome, cnpj, cep, logradouro, bairro, num_estabelecimento, cidade, estado,
					  nome_representante, num_telefone, id_acesso, data_cadastro) 
                      
values ('Carrefour', '08.740.658/0001-41', '08260-000', 'Av. Jacu Pêssego', 'Itaquera', '1254', 
                     'São Paulo', 'SP', 'Rafael dos Santos', '(11) 2345-2342', '0f67df', '2020-02-28'),
        
        ('Carrefour Express Shopping Itaquera', '48.570.753/0001-69', '08220-900', 'Av. José Pinheiro Borges', 'Itaquera', 's/n', 
        'São Paulo', 'SP', 'Daiane Souza Silva','(11) 6856-6456', '06e3e9', '2020-02-28'),
        
        ('Extra Hipermercado', '64.379.191/0001-27', '01317-001', 'Av. Brigadeiro Luís Antônio', 'Bela Vista', '2013', 
        'São Paulo', 'SP', 'Daniele Nogueira', '(11) 2545-0931', '33ca88', '2020-02-28'),
        
        ('Lojas Americanas', '61.179.784/0001-51', '03568-010', 'R. Dr. Campos Moura', 'Parque Artur Alvim', '311 ',
        'Rio Grande do Norte', 'RN', 'Joaquim Soares Oliveira','(43) 5675-3245', '2659c3', '2020-02-28'),
        
        ('Mercado Extra - Belém', '87.309.183/0001-00', '03057-040', 'Largo São José do Belém', 'R. Belém', '23 ',
        'Mato grosso do sul', 'MS', 'Joaquim Soares Oliveira','(43) 5675-3245', '072785', '2020-02-28');
-- tbMercado

-- tbSetor - Um mercado pode ter mais de um setor logo nós podemos adicionar o código do mesmo mercado várias vezes como chave estrangeira
-- o setor leva: sua descrição e cod do mercado ao qual está relacionado
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

-- tbSensor -- Um setor pode ter mais de um sensor. O sensor leva: a sua identificação, o cod. do setor em qual está instalado e data que o mesmo
-- foi cadastrado
insert into tbSensor(identificacao, cod_setor, data_cadastro)

values ('A1_Entrada', 1, '2020-01-09'), ('A2_Entrada', 1, '2020-01-09'), ('A3_Entrada', 1, '2020-01-09'), ('A4_Entrada', 1, '2020-01-09'),
	   ('A5_Estacionamento', 2, '2020-01-09'), ('A6_Estacionamento', 2, '2020-01-09'), ('A1_Estacionamento', 2 , '2020-01-09'), 
       ('A2_Estacionamento', 2, '2020-01-09'), ('A3_Entrada_2', 3, '2020-01-09'), ('A4_Entrada_2', 3, '2020-01-09'), ('A5_Entrada_2', 3, '2020-01-09'), 
       ('A6_Entrada_2', 3, '2020-01-09'),('A1_Saída', 4, '2020-01-09'), ('A2_Saída', 4, '2020-01-09'), ('A3_Saída', 4, '2020-01-09'), 
       ('A4_Saída', 4, '2020-01-09'), ('A5_Entrada', 5, '2020-01-09'), ('A6_Entrada', 5, '2020-01-09'),('A1_Entrada', 5, '2020-01-09'), 
       ('A2_Entrada', 5, '2020-01-09'), ('A3_Saída_2', 6, '2020-01-09'), ('A4_Saída_2', 6, '2020-01-09'), ('A5_Saída_2', 6, '2020-01-09'), 
       ('A6_Saída_2', 6, '2020-01-09'), ('A1_Corredor_1', 7, '2020-01-09'), ('A2_Corredor_1', 7, '2020-01-09'), ('A3_Corredor_1', 7, '2020-01-09'),
       ('A4_Corredor_1', 7, '2020-01-09'), ('A1_Corredor_2', 8, '2020-01-09'), ('A2_Corredor_2', 8, '2020-01-09'), 
       ('A3_Corredor_2', 8, '2020-01-09'), ('A4_Corredor_2', 8, '2020-01-09');
-- tbSensor

-- tbEvento_Sensor - Um sensor pode ter mais de um evento. O evento leva: a informação, o cod. do sensor e data_hora da informação passada
insert into tbEventos_Sensor(info_sensor, cod_sensor, data_hora_info)

values (1,4, '2020-01-09 09:12:23'), (1,4, '2020-01-09 09:12:23'), (1,10, '2020-01-09 09:12:23'), (1,8, '2020-01-09 09:12:23'), 
	   (1,4, '2020-01-09 09:12:23'), (1,3, '2020-01-09 09:12:23'),(1,1, '2020-01-09 09:12:23'), (1,8, '2020-01-09 09:12:23'), 
       (1,8, '2020-01-09 09:12:23'), (1,4, '2020-01-09 09:12:23'), (1,4, '2020-01-09 09:12:23'), (1,8, '2020-01-09 09:12:23'),
       (1,12, '2020-01-09 09:12:23'), (1,20, '2020-01-09 09:12:23'), (1,12, '2020-01-09 09:12:23'), (1,12, '2020-01-09 09:12:23'), 
       (1,8, '2020-01-09 09:12:23'), (1,12, '2020-01-09 09:12:23'), (1,20, '2020-01-09 09:12:23'), (1,12, '2020-01-09 09:12:23'), 
       (1,6,'2020-01-09 09:12:23'), (1,26, '2020-01-09 09:12:23'), (1,1, '2020-01-09 09:12:23'), (1,4, '2020-01-09 09:12:23'),
	   (1,1, '2020-01-09 09:12:23'), (1,4, '2020-01-09 09:12:23'), (1,7,'2020-01-09 09:12:23'), (1,9, '2020-01-09 09:12:23'), 
       (1,19, '2020-01-09 09:12:23'), (1,22, '2020-01-09 09:12:23'), (1,9, '2020-01-09 09:12:23'), (1,14, '2020-01-09 09:12:23'), 
       (1,27,'2020-01-09 09:12:23'), (1,23,'2020-01-09 09:12:23'), (1,12,'2020-01-09 09:12:23'), (1,11,'2020-01-09 09:12:23');
-- tbEvento_Sensor
	
       
-- tbTipo_Usuario
insert into tbTipo_Usuario(descricao)
values ('Administrador'), ('Cliente');
-- tbTipo_Usuario

-- tbUsuario 
-- Neste exemplo adicionamos um usuário do tipo 'Administrador', para cadastrar um usuário do tipo 'Cliente(2)' é preciso cadastrar um mercado antes
-- O tipo usuário 'Administrador(1)' não está relacionado a nenhum mercado por isso o campo 'cod_mercado' está 'null'
insert into tbUsuario(email, senha, cod_tipo_usuario, data_cadastro, cod_mercado)

values ('flow_contato@gmail.com.br', 'jeejdkjava', 1, '2020-01-09', null),
	   ('adm_flow@gmail.com.br', 'jeejdkjava', 1, '2020-02-28', null),
       ('fernand@gmail.com.br', '12345', 2, '2020-05-01', 3),
       ('larissa@gmail.com.br', '45678', 2, '2020-05-01', 2),;

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


-- EM CASO DE ERROS, UTILIDADES:

-- Aumentando o tamanho de um campo
-- alter table tbMercado modify nome varchar(35);
-- alter table tbUsuario modify cod_mercado int;
-- alter table tbSensor modify identificacao varchar(20);

-- Alterando nome da tabela
-- rename table tb_Eventos_Sensor to tbEventos_Sensor;

-- Altera o nome da coluna
-- alter table tbMercado change nome_respresentante nome_representante varchar(30) not null;

-- Alterando o registro
-- update tbUsuario set cod_tipo_usuario = 1 where cod_usuario = 2;


