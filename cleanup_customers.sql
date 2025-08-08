-- SQL to clean up customer table
USE pharmacy_db;

-- Remove the timestamp columns
ALTER TABLE customers DROP COLUMN created_at;
ALTER TABLE customers DROP COLUMN updated_at;

-- Check the table structure
DESCRIBE customers;
