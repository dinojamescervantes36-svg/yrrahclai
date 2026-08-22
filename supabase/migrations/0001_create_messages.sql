-- yrrah — messages table
-- Two fixed accounts exchange messages directly with each other.
-- There is no password-based login (sign-in is just picking a name), so
-- this is a private, trust-based two-person app rather than a public one:
-- RLS is enabled but policies are permissive for anon/authenticated,
-- since there is no real auth.uid() to scope rows to.

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender text not null check (sender in ('Yrrah Clai Corpuz', 'Dino James Cervantes')),
  recipient text not null check (recipient in ('Yrrah Clai Corpuz', 'Dino James Cervantes')),
  body text not null check (char_length(body) > 0 and char_length(body) <= 2000),
  read boolean not null default false,
  created_at timestamptz not null default now(),
  constraint sender_recipient_differ check (sender <> recipient)
);

create index if not exists messages_recipient_created_idx
  on public.messages (recipient, created_at desc);

create index if not exists messages_sender_created_idx
  on public.messages (sender, created_at desc);

alter table public.messages enable row level security;

drop policy if exists "messages_select_all" on public.messages;
create policy "messages_select_all" on public.messages
  for select
  to anon, authenticated
  using (true);

drop policy if exists "messages_insert_all" on public.messages;
create policy "messages_insert_all" on public.messages
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "messages_update_all" on public.messages;
create policy "messages_update_all" on public.messages
  for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "messages_delete_all" on public.messages;
create policy "messages_delete_all" on public.messages
  for delete
  to anon, authenticated
  using (true);

-- Enable realtime so a message sent by one account shows up live for the
-- other, without needing to refresh or poll.
alter publication supabase_realtime add table public.messages;
