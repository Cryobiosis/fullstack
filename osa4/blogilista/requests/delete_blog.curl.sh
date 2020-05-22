#/bin/sh
curl -vv \
-X DELETE \
-H "Authorization: bearer ${TOKEN}" \
http://localhost:3003/api/blogs/$1
