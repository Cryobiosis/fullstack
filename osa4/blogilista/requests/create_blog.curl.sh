#/bin/sh

curl -vv \
-d '{"title": "sample 1","author": "test 2", "url": "http://localhost/", "likes": "1"}' \
-H 'Content-Type: application/json' \
-H "Authorization: bearer ${TOKEN}" \
http://localhost:3003/api/blogs
