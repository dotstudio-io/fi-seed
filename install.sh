#!/bin/bash

echo -e "\n\033[1m>> Installing Telemed...\033[0m\n\n"

echo -e "\033[1m>> Installing Node modules...\033[0m\n"
npm install

echo -e "\n\n\033[1m>> Installing Bower components...\033[0m\n"
bower install

echo -e "\n\n\033[1m>> Inserting static data into database...\033[0m\n"
node statics

echo -e "\n\033[1m>> Installation complete!\033[0m\n"
