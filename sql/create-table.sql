create table hadiths (
  id bigserial primary key,
  arabic text NOT NULL,
  narrator text NOT NULL,
  english text NOT NULL,
  chapter_id int NOT NULL,
  book_id int NOT NULL,
  id_in_book int NOT NULL
  total_tokens int
  embedding vector (1536)
);
