#!/bin/bash
# Alternative way to serve ToySwap on port 3600 using PM2
# Use this if Caddy isn't working

cd "$(dirname "$0")"

echo "Starting ToySwap static server on port 3600..."
pm2 stop toyswap-server 2>/dev/null || true
pm2 delete toyswap-server 2>/dev/null || true

pm2 start --name toyswap-server "npx serve dist -l 3600 --single"
pm2 save

echo "ToySwap is now served at http://localhost:3600"
echo "To stop: pm2 stop toyswap-server"