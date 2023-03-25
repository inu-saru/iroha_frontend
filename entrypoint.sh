#!/bin/sh
ROOT_DIR="/iroha_front"
APP_DIR="$ROOT_DIR/app"

echo "npm run dev"
cd $APP_DIR
npm i && npm run dev
exec "$@"