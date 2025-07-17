CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firebase_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL -- 'income' or 'expense'
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  category_id INTEGER NOT NULL REFERENCES categories(id),
  amount NUMERIC(10, 2) NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'income' or 'expense'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO categories (name, type) VALUES
('Salary', 'income'),
('Freelance', 'income'),
('Investment', 'income'),
('Rent', 'expense'),
('Groceries', 'expense'),
('Transportation', 'expense'),
('Entertainment', 'expense');

CREATE TABLE premium (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  is_active BOOLEAN NOT NULL DEFAULT false,
  expiry_date TIMESTAMP WITH TIME ZONE,
  features TEXT[]
);
