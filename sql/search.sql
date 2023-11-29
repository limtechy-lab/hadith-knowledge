create or replace function search_hadiths (
  query_embedding vector(1536),
  similarity_threshold float,
  match_count int
)
returns table (
  id bigint,
  arabic text,
  narrator text,
  english text,
  chapter_id bigint,
  book_id bigint,
  id_in_book bigint,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    hadiths.id,
    hadiths.arabic,
    hadiths.narrator,
    hadiths.english,
    hadiths.chapter_id,
    hadiths.book_id,
    hadiths.id_in_book,
    1 - (hadiths.embedding <=> query_embedding) as similarity
  from hadiths
  where 1 - (hadiths.embedding <=> query_embedding) > similarity_threshold
  order by hadiths.embedding <=> query_embedding
  limit match_count;
end;
$$;