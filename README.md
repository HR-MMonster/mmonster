# mmonster

## Synopsis

Welcome to MMOnster, where MMO players can connect with groups, and groups can connect with players.

## Deployment

Temporarily deployed on Digital Ocean MEAN stack server @ 107.170.198.59:8000 until end of week 4/18/2016
Running server.js will start the server on port 8000 and statically load the client folder.

Command-line deployment from mmonster/:
  bower install
  cd server
  npm install
  node server.js


## API Reference

Please refer to the API documentation for API endpoints, file structure, and DB schemas.

## Working with the Database

The database is run using MongoDB with mongoose ORM. The repo is set to automatically generate users, character profiles, groups, and group profiles (350 each). If you make changes to your database and need to re-seed the data, simply drop the database in your mongo instance and restart your server. Be forewarned, this can take a few minutes!

Note that the logic for creating random data is found at the bottom of the server/data/testDataTemplates file.


## Contributors:

    Travis Baratcart
    
    Colin Goltra

    David Ogor

    Michael Rico

