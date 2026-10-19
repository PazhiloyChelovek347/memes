-- Схема для лайков/дизлайков. Выполнить один раз в SQL Editor НОВОГО проекта Supabase.
-- Ничего не удаляет: только create ... if not exists.

create table if not exists public.reactions (
  device_id    uuid        not null,
  content_key  text        not null check (char_length(content_key) between 1 and 200),
  reaction     text        not null check (reaction in ('like', 'dislike')),
  device_label text        not null default '' check (char_length(device_label) <= 100),
  updated_at   timestamptz not null default now(),
  primary key (device_id, content_key)
);

alter table public.reactions enable row level security;

-- Без авторизации: ключ anon публичный, так что клиент и админка ходят в таблицу напрямую.
-- Для мемов это осознанный компромисс — реакции может прочитать любой, кто знает адрес проекта.
do $$
begin
  if not exists (select 1 from pg_policies where tablename = 'reactions' and policyname = 'anon_all') then
    create policy anon_all on public.reactions
      for all to anon using (true) with check (true);
  end if;
end $$;

grant select, insert, update, delete on public.reactions to anon;
