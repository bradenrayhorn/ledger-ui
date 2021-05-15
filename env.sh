#!/bin/sh
# line endings must be \n, not \r\n !
echo "window._env_ = {" > /var/www/env-config.js
(printenv | grep REACT_APP) > .env
awk -F '=' '{ print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' ./.env >> /var/www/env-config.js
echo "}" >> /var/www/env-config.js
