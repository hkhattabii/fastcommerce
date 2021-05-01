const CREATE_TABLE_STATEMENTS = {
  USR: `CREATE TABLE USR (
      id SERIAL PRIMARY KEY,
      EMAIL VARCHAR(64) UNIQUE NOT NULL,
      PASSWORD TEXT NOT NULL,
      CREATED_AT TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`,
  PWD_REQ: `CREATE TABLE PWD_REQ (
  	id SERIAL PRIMARY KEY,
	  EMAIL VARCHAR(64) UNIQUE NOT NULL,
  	CODE VARCHAR(4)  NOT NULL 
)`,
  PRDT: `CREATE TABLE PRDT (
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
  DISC_CODE: `CREATE TABLE DISC_CODE (
    id serial PRIMARY KEY,
    code VARCHAR(6),
    reduction integer
  )`,
  CRT: `CREATE TABLE crt (
    user_id integer PRIMARY KEY,
    discount_code_id integer,

    foreign key (user_id) references usr(id) on delete CASCADE on update CASCADE,
    foreign key (discount_code_id) references disc_code(id) on delete SET NULL
  )`,
  CRT_ROW: `CREATE TABLE crt_row (
      cart_id integer,
      product_id integer,
      quantity integer not null default 1,
    
      primary key (cart_id, product_id),
      
      foreign key (cart_id) references crt(user_id) on delete CASCADE on update CASCADE,
      foreign key (product_id) REFERENCES prdt(id) on delete CASCADE on update CASCADE
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
  BACKUP: `
  CREATE TABLE bak_row (
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,

    primary key (user_id, product_id),

    foreign key (user_id) references usr(id) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key (product_id) references prdt(id) ON DELETE CASCADE ON UPDATE CASCADE
  )`,
  HISTORY: `
  CREATE TABLE hx_row (
    id SERIAL PRIMARY KEY,
    view_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,

    foreign key (user_id) references usr(id) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key (product_id) references prdt(id) ON DELETE CASCADE ON UPDATE CASCADE
  )
  `
};

module.exports = CREATE_TABLE_STATEMENTS;
