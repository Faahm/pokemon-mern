# pokemon-mern

## How to get started

### Create a .env folder

- After setting up your Mongo DB cloud server, copy its `ATLAS_URI` and paste it in the .env file. Add a database name before `?retryWrites=true&w=majority`.
- Set your port number (e.g `PORT=5000`)

### Populate your MongoDB Atlas database

Execute `node populateDb.js "<your MongoDB URL>"` in the terminal. Your database should be populated after `"Inserted 151 Pokemons"` shows on the terminal.

### Run the server and the client

- To run the server (back-end), navigate to server, `cd server`, and execute `npm start` in the terminal.
- To run the client (front-end), navigate back to the root directory, `cd ..`, and execute `npm start` in the terminal
