INSERT INTO users (username, email, password) 
VALUES ('Eman', 'emanabsi30@gmail.com', '$2a$12$2TiH6rWNr1D8lWmnnUNE1e8BkuG9Le0UqqCoBBxz7Fu/4v6txwNoC');

INSERT INTO users (username, email, password) 
VALUES ('Nada', 'nadaTheSaver@gmail.com', '$2a$12$2TiH6rWNr1D8lWmpnUNE1e8BkuG9Le0UqqCoBBxz7Fu/4v6txwNoC');

INSERT INTO posts (title, description, media, user_id) 
values ('Slow down life', 'save your tears for another day',null,2) RETURNING *;

INSERT INTO comments (content, user_id, post_id) values('aya asked me to test', 1, 1);
   