DROP SEQUENCE IF EXISTS public.candles_id_seq;
DROP TABLE IF EXISTS public.candles;

CREATE SEQUENCE public.candles_id_seq
    INCREMENT 1
    START 1;


CREATE TABLE public.candles
(
    id integer NOT NULL DEFAULT nextval('candles_id_seq'::regclass),
    title character varying(255) NOT NULL,
    price integer NOT NULL,
    img_path character varying(255),
    PRIMARY KEY (id)
);


ALTER SEQUENCE public.candles_id_seq
    OWNED BY candles.id;

ALTER TABLE public.candles
    OWNER to postgres;

ALTER SEQUENCE public.candles_id_seq
    OWNER TO postgres;


INSERT INTO public.candles(
    title, price, img_path)
    VALUES
        ('CONGRATS', 1390, 'assets/img/store-item-1.jpg'),
        ('NAMASTE', 1590, 'assets/img/store-item-2.jpg'),
        ('CONGRATS', 1290, 'assets/img/store-item-3.jpg'),
        ('CANT ADULT', 1390, 'assets/img/store-item-4.jpg'),
        ('LOVE YOU MORE ICE CREAM', 2090, 'assets/img/store-item-5.jpg'),
        ('I SEE IT, I LIKE IT', 1690, 'assets/img/store-item-6.jpg'),
        ('YOU GROW GIRL', 1290, 'assets/img/store-item-7.jpg');
