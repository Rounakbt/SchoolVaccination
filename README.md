# SchoolVaccination

Below are the Steps which are needed to follow to run the application on local 
1. For Starting the application we just need to start the Backend and frontend individually using terminal.
2. And below is the Create Script for the Tables just run this in your local PostgreSQL editor and update the connection string in the code

#Note : there are prereqistics which are needed like-
- Node is installed
- Install dependencies to Run React Application

-- Table: public.students

-- DROP TABLE IF EXISTS public.students;

CREATE TABLE IF NOT EXISTS public.students
(
    id integer NOT NULL DEFAULT nextval('students_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    class character varying(10) COLLATE pg_catalog."default" NOT NULL,
    roll_number character varying(20) COLLATE pg_catalog."default" NOT NULL,
    vaccinated boolean DEFAULT false,
    vaccination_name character varying(100) COLLATE pg_catalog."default",
    vaccination_date date,
    number_of_vaccines integer DEFAULT 0,
    CONSTRAINT students_pkey PRIMARY KEY (id),
    CONSTRAINT students_roll_number_key UNIQUE (roll_number)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.students
    OWNER to postgres;





	-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    username character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password character varying(100) COLLATE pg_catalog."default" NOT NULL,
    role character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT 'admin'::character varying,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_username_key UNIQUE (username)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;





	-- Table: public.vaccination_drives

-- DROP TABLE IF EXISTS public.vaccination_drives;

CREATE TABLE IF NOT EXISTS public.vaccination_drives
(
    id integer NOT NULL DEFAULT nextval('vaccination_drives_id_seq'::regclass),
    vaccine_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    drive_date date NOT NULL,
    doses_available integer NOT NULL,
    vaccination_destination character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT vaccination_drives_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.vaccination_drives
    OWNER to postgres;
