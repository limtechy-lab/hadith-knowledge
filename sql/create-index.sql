create index on public.hadiths 
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);