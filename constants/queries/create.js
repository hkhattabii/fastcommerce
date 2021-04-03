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
  CREATE_TABLE_GNDR: `CREATE TABLE GNDR (
      id serial primary key,
      name VARCHAR(1) UNIQUE not NULL
  )`,
  CREATE_TABLE_BRND: `create table BRND (
    ID SERIAL PRIMARY KEY,
      NAME VARCHAR(64) UNIQUE NOT NULL 
  )`,
  CREATE_TABLE_CTGR: `CREATE TABLE CTGR (
    ID SERIAL PRIMARY KEY,
      NAME VARCHAR(64) UNIQUE NOT NULL
  )`,
  CREATE_TABLE_PRDT: `create table PRDT (
      id serial primary key,
      name varchar(128) not null,
      description TEXT,
      price DECIMAL NOT NULL DEFAULT 0.00,
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      gender_id INTEGER NOT NULL,
      brand_id INTEGER NOT NULL,
      category_id INTEGER NOT NULL,
    
      FOREIGN key (gender_id) REFERENCES GNDR(id) ON DELETE CASCADE,
      FOREIGN key (brand_id) REFERENCES BRND(id) ON DELETE CASCADE,	
      FOREIGN key (category_id) REFERENCES CTGR(id) ON DELETE CASCADE
  )`,
  CREATE_TABLE_IMG: `create table img (
      id serial primary key,
      product_id integer not NULL,
      url text not null,
    
      foreign key (product_id) REFERENCES prdt(id) on DELETE CASCADE on UPDATE CASCADE
  )`,
  CREATE_TABLE_DISC: `create table disc (
      category_id integer primary key not null,
      percentage integer not null,
    
      FOREign key (category_id) REFERENCES ctgr (id) on DELETE CASCADE on UPDATE cascade
  )`,
};

module.exports = CREATE_TABLE_STATEMENTS;
