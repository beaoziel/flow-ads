create database fluxo_de_pessoas;
use fluxo_de_pessoas;

create table Cliente (
id_Cliente int primary key auto_increment,
cnpj char (18),
endereco varchar (100),
telefone char (15),
token varchar (7),
nome_Representante varchar (100),
email_Representante varchar (40)
);

create table Usuario (
id_Usuario int primary key auto_increment,
email varchar (40),
senha varchar (20)
);

create table Sensor (
id_Sensor int primary key auto_increment,
localizacao varchar (20)
);

create table Eventos (
sequencial int primary key auto_increment,
data_hora datetime
);

insert into Cliente values
(null,'89.879.123/9705-78','RUA CASA DO ATOR, 275, VILA OLÍMPIA, 04546-001',
'(11) 2523-9878', 'arc2435','Fábio Barros Rodrigues','FabioBarrosRodrigues@gmail.com'),

(null,'32.395.395/3854-95','RUA GEORGE HOM, 230, BROOKLIN NOVO, 04576-020',
'(11) 4683-9365','ghn3853','Livia Alves Almeida','LiviaAlvesAlmeida@gmail.com'),

(null,'29.284.295/2053-02','RUA CINCINATO BRAGA, 306, VILA MARIANA, 01333-010',
'(11) 9362-2963','jkf3946','Fábio Rocha Cunha','FabioRochaCunha@gmai.com');

insert into Usuario values
(null,'OtavioPereiraBarbosa@gmail.com' ,'IraGh5hoh0a'),
(null,'LucasGomesAraujo@hotmail.com'   ,'Tohl6yor1o'),
(null,'CamilaCarvalhoPereira@gmail.com','Zee7Iech8u');

insert into Sensor values
(null, 'corredor 1'),
(null, 'corredor 2'),
(null, 'corredor 3'),
(null, 'corredor 1'),
(null, 'corredor 2'),
(null, 'corredor 3'),
(null, 'corredor 1'),
(null, 'corredor 2'),
(null, 'corredor 3');

insert into Eventos values
(null,'2020-03-05 09:05'),
(null,'2020-03-05 12:20'),
(null,'2020-03-05 14:16'),
(null,'2020-03-05 10:34'),
(null,'2020-03-05 13:09'),
(null,'2020-03-05 18:59'),
(null,'2020-03-05 07:35'),
(null,'2020-03-05 09:42'),
(null,'2020-03-05 15:30'),
(null,'2020-03-05 08:23'),
(null,'2020-03-05 11:10'),
(null,'2020-03-05 13:45'),
(null,'2020-03-05 13:28'),
(null,'2020-03-05 16:15'),
(null,'2020-03-05 18:34'),
(null,'2020-03-05 12:14'),
(null,'2020-03-05 16:49'),
(null,'2020-03-05 17:36'),
(null,'2020-03-06 09:05'),
(null,'2020-03-06 13:50'),
(null,'2020-03-06 17:38'),
(null,'2020-03-06 08:47'),
(null,'2020-03-06 10:25'),
(null,'2020-03-06 12:49'),
(null,'2020-03-06 10:05'),
(null,'2020-03-06 16:30'),
(null,'2020-03-06 18:00');

alter table Usuario add id_Cliente int;
alter table Usuario add foreign key(id_Cliente) references Cliente(id_Cliente);

alter table Sensor add id_Cliente int;
alter table Sensor add foreign key(id_Cliente) references Cliente(id_Cliente);

alter table Eventos add id_Sensor int;
alter table Eventos add foreign key(id_Sensor) references Sensor(id_Sensor);

update Usuario set id_Cliente = 1 where id_Usuario = 1;
update Usuario set id_Cliente = 2 where id_Usuario = 2;
update Usuario set id_Cliente = 3 where id_Usuario = 3;

update Sensor set id_Cliente = 1 where id_Sensor in (1,2,3);
update Sensor set id_Cliente = 2 where id_Sensor in (4,5,6);
update Sensor set id_Cliente = 3 where id_Sensor in (7,8,9);

update Eventos set id_Sensor = 1 where Sequencial in (1,2,3);
update Eventos set id_Sensor = 2 where Sequencial in (4,5,6);
update Eventos set id_Sensor = 3 where Sequencial in (7,8,9);
update Eventos set id_Sensor = 4 where Sequencial in (10,11,12);
update Eventos set id_Sensor = 5 where Sequencial in (13,14,15);
update Eventos set id_Sensor = 6 where Sequencial in (16,17,18);
update Eventos set id_Sensor = 7 where Sequencial in (19,20,21);
update Eventos set id_Sensor = 8 where Sequencial in (22,23,24);
update Eventos set id_Sensor = 9 where Sequencial in (25,26,27);

select * from Cliente;
select * from Usuario;
select * from Sensor;
select * from Eventos;

select * from sensor, eventos where sensor.id_sensor = eventos.id_sensor;
select cliente.cnpj, endereco, eventos.data_hora, sensor.localizacao from cliente, sensor, eventos;
