-- Rode este script no SQL editor do seu projeto Supabase.

create table meals (
  id uuid primary key default gen_random_uuid(),
  meal_type text not null check (meal_type in ('breakfast', 'lunch', 'afternoon_snack', 'dinner')),
  amount text not null check (amount in ('small', 'normal', 'large')),
  foods jsonb not null default '[]'::jsonb,
  symptom text not null check (symptom in ('well', 'discomfort', 'pain', 'severe_pain')),
  notes text,
  meal_date date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table meals enable row level security;

-- App pessoal sem autenticação: política permissiva para o role anon.
-- Só é aceitável porque o app não será publicado para múltiplos usuários;
-- revisar antes de qualquer publicação multiusuário (ver PLAN.md seção 39).
create policy "anon full access" on meals
  for all
  using (true)
  with check (true);
