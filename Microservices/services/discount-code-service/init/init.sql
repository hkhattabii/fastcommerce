create table disc_code (
	id serial primary key,
  	code VARCHAR(8) not null,
  	amount INTEGER not null
);

insert into disc_code(code, amount) values ('POUJSQ', 20)
