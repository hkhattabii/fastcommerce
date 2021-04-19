const CREATE_TABLE_STATEMENTS = {
  CREATE_TABLE_USR: `CREATE TABLE USR (
      id SERIAL PRIMARY KEY,
      EMAIL VARCHAR(64) UNIQUE NOT NULL,
      PASSWORD TEXT NOT NULL,
      CREATED_AT TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`,
  CREATE_TABLE_PWD_REQ: `CREATE TABLE PWD_REQ (
  	id SERIAL PRIMARY KEY,
	  EMAIL VARCHAR(64) UNIQUE NOT NULL,
  	CODE VARCHAR(4)  NOT NULL 
)`,
  CREATE_TABLE_PRDT: `create table PRDT (
      id serial primary key,
      name varchar(128) not null,
      description TEXT,
      price DECIMAL NOT NULL DEFAULT 0.00,
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      gender VARCHAR(16) NOT NULL,
      brand VARCHAR(128) NOT NULL,
      category VARCHAR(64) NOT NULL,
      image TEXT NOT NULL
  )`,
  CRT_ROW: ` CREATE TABLE crt_row (
      user_id integer,
      product_id integer,
      quantity integer not null default 1,
    
      primary key (user_id, product_id),
      
      foreign key (user_id) references usr(id) on delete CASCADE on UPDATE CASCADE,
      foreign key (product_id) REFERENCES prdt(id) on delete cascade on update CASCADE
  )`,
  ADDRESS: `
  CREATE TABLE ADDRESS (
    id SERIAL PRIMARY KEY,
    street TEXT NOT NULL,
    street_number INTEGER NOT NULL,
    zipcode VARCHAR(64) NOT NULL,
    city VARCHAR(128) NOT NULL,
    country VARCHAR(128)
  )
  `,
  BILL: `CREATE TABLE bill (
    id SERIAL PRIMARY KEY,
    status TEXT NOT NULL DEFAULT 'Waiting for payment',
    createdat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL,
    address_id INTEGER NOT NULL,

    foreign key (user_id) references usr(id) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key (address_id) references address(id) ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  BILL_PRDT: `CREATE TABLE bill_prdt (
      bill_id integer NOT NULL,
      product_id integer NOT NULL,
      quantity integer NOT NULL default 0,

      primary key (bill_id, product_id),

      foreign key (bill_id) references bill(id) ON DELETE CASCADE ON UPDATE CASCADE,
      foreign key (product_id) references prdt(id) ON DELETE CASCADE ON UPDATE CASCADE
    )
  `,
  DELIVERY: `
  CREATE TABLE dlvry (
    id SERIAL PRIMARY KEY,
    status TEXT NOT NULL DEFAULT 'In warehouse',
    estimated_date TIMESTAMP NOT NULL,
    bill_id INTEGER NOT NULL,
    address_id INTEGER NOT NULL,

    foreign key (bill_id) references bill(id) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key (address_id) references address(id) ON DELETE CASCADE ON UPDATE CASCADE
  )
    
  `,
};

module.exports = CREATE_TABLE_STATEMENTS;
