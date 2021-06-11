CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  page_count INTEGER NOT NULL,
  description TEXT, 
  fiction boolean
);