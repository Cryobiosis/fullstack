#/bin/sh
BLOG_ID="5ec66345b65fd5ed237376db"

curl -vv \
-d '{"comment": "comment"}' \
-H 'Content-Type: application/json' \
-H "Authorization: bearer ${TOKEN}" \
http://localhost:3003/api/blogs/$BLOG_ID/comments
