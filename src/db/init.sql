create database osomq;
\c osomq;
create table users (
id serial primary key,
email text unique not null,
password text not null
);

