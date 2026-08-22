-- yrrah — custom display nicknames for a message's "To"/"From"
-- These are purely cosmetic: routing/inbox delivery still uses the real
-- sender/recipient account columns from 0001. sender_label/recipient_label
-- just let the writer type a pet name (e.g. "Your lover", "Binibining Clai")
-- to show instead of the real account name on that one message.

alter table public.messages
  add column if not exists sender_label text
    check (sender_label is null or char_length(sender_label) <= 60),
  add column if not exists recipient_label text
    check (recipient_label is null or char_length(recipient_label) <= 60);