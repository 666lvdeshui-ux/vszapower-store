-- Product review display settings. Apply before deploying the admin toggle.
begin;
alter table public.products add column if not exists show_reviews boolean not null default false;
alter table public.products add column if not exists review_group text;
update public.products set show_reviews=true, review_group='temu-606258002264728'
where id in ('prod_1785144575937','prod_1785382687464','prod_1785382945991');
update public.products set show_reviews=false, review_group=null
where id in ('prod_lir2016_battery','prod_lir2025_battery','prod_lir2032_battery','prod_lir2450_battery','prod_ml2032_battery');
commit;
