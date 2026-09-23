-- Active: 1790183513070@@127.0.0.1@3307@mysql
create database MY_to_do_list;

use MY_to_do_list;

create table users (
    userId int auto_increment primary key,
    userName varchar(255) unique not null,
    userPassword varchar(255)  not null
);

create table projects (
    projectId int auto_increment primary key,
    projectName varchar(255),
    userId int,
    Foreign Key (userId) REFERENCES users (userId) on DElete cascade
);



create table tasks (
    taskId int auto_increment primary key,
    taskTitle varchar(255),
    taskStatus varchar(255),
    projectId int,
    Foreign Key (projectId) REFERENCES projects(projectId) on DElete cascade
);

select * From users;