PGDMP  )    2                }            vaccination_app    17.4    17.4     
           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    24618    vaccination_app    DATABASE     �   CREATE DATABASE vaccination_app WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE vaccination_app;
                     postgres    false            �            1259    24630    students    TABLE     V  CREATE TABLE public.students (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    class character varying(10) NOT NULL,
    roll_number character varying(20) NOT NULL,
    vaccinated boolean DEFAULT false,
    vaccination_name character varying(100),
    vaccination_date date,
    number_of_vaccines integer DEFAULT 0
);
    DROP TABLE public.students;
       public         heap r       postgres    false            �            1259    24629    students_id_seq    SEQUENCE     �   CREATE SEQUENCE public.students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.students_id_seq;
       public               postgres    false    220                       0    0    students_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;
          public               postgres    false    219            �            1259    24620    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    role character varying(20) DEFAULT 'admin'::character varying NOT NULL
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    24619    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    218                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    217            �            1259    24640    vaccination_drives    TABLE     �   CREATE TABLE public.vaccination_drives (
    id integer NOT NULL,
    vaccine_name character varying(100) NOT NULL,
    drive_date date NOT NULL,
    doses_available integer NOT NULL,
    vaccination_destination character varying(100)
);
 &   DROP TABLE public.vaccination_drives;
       public         heap r       postgres    false            �            1259    24639    vaccination_drives_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vaccination_drives_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.vaccination_drives_id_seq;
       public               postgres    false    222                       0    0    vaccination_drives_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.vaccination_drives_id_seq OWNED BY public.vaccination_drives.id;
          public               postgres    false    221            c           2604    24633    students id    DEFAULT     j   ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);
 :   ALTER TABLE public.students ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    220    220            a           2604    24623    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            f           2604    24643    vaccination_drives id    DEFAULT     ~   ALTER TABLE ONLY public.vaccination_drives ALTER COLUMN id SET DEFAULT nextval('public.vaccination_drives_id_seq'::regclass);
 D   ALTER TABLE public.vaccination_drives ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    222    221    222                      0    24630    students 
   TABLE DATA           �   COPY public.students (id, name, class, roll_number, vaccinated, vaccination_name, vaccination_date, number_of_vaccines) FROM stdin;
    public               postgres    false    220   �                 0    24620    users 
   TABLE DATA           =   COPY public.users (id, username, password, role) FROM stdin;
    public               postgres    false    218   N                 0    24640    vaccination_drives 
   TABLE DATA           t   COPY public.vaccination_drives (id, vaccine_name, drive_date, doses_available, vaccination_destination) FROM stdin;
    public               postgres    false    222   z                  0    0    students_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.students_id_seq', 33, true);
          public               postgres    false    219                       0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 1, true);
          public               postgres    false    217                       0    0    vaccination_drives_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.vaccination_drives_id_seq', 11, true);
          public               postgres    false    221            l           2606    24636    students students_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.students DROP CONSTRAINT students_pkey;
       public                 postgres    false    220            n           2606    24638 !   students students_roll_number_key 
   CONSTRAINT     c   ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_roll_number_key UNIQUE (roll_number);
 K   ALTER TABLE ONLY public.students DROP CONSTRAINT students_roll_number_key;
       public                 postgres    false    220            h           2606    24626    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    218            j           2606    24628    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public                 postgres    false    218            p           2606    24647 *   vaccination_drives vaccination_drives_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.vaccination_drives
    ADD CONSTRAINT vaccination_drives_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.vaccination_drives DROP CONSTRAINT vaccination_drives_pkey;
       public                 postgres    false    222               H   x�34�����Sp�O�44�400�,�,+�4202�50�52�4�26��H,J���442��?2������ ,��            x�3��H,J�̆Q�)��y\1z\\\ yn�         {   x�]�K
�0��p��^��Ί��:	�(�J�o(~��s?���k��m��{T��a�-����u*a�������`�X-D�[Z�TY����O,�!�q�N�Nlޭ���vM���)     