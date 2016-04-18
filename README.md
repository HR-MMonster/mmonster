# mmonster

## Synopsis

Welcome to MMOnster, where MMO players can connect with groups, and groups can connect with players.

## Deployment

## API Reference

Please refer to the API documentation for API endpoints, file structure, and DB schemas.

## Working with the Database

The database is run using MongoDB with mongoose ORM. The repo is set to automatically generate users, character profiles, groups, and group profiles (350 each). If you make changes to your database and need to re-seed the data, simply drop the database in your mongo instance and restart your server. Be forewarned, this can take a few minutes!

Note that the logic for creating random data is found at the bottom of the server/data/testDataTemplates file.


## Contributors:

    David Ogor

    Travis Baratcart

    Michael Rico

    Colin Goltra
