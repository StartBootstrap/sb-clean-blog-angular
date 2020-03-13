#!/usr/bin/env bash

cat <<EOF > /usr/share/nginx/html/config.json
{
    "sbCleanBlogNodeURL": "$SB_CLEAN_BLOG_NODE_URL",
    "demoEnabled": $DEMO_ENABLED
}
EOF

nginx -g 'daemon off;'
