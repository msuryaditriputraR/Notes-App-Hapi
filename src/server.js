// NOTE: Import dotenv package and run its configuration
require('dotenv').config();

const Hapi = require('@hapi/hapi');

//NOTES PLUGIN
const notes = require('./api/notes');
const NotesService = require('./services/postgres/NotesService');
const NotesValidator = require('./validator/notes');

// USERS PLUGIN
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

const init = async () => {
    const notesService = new NotesService();
    const usersService = new UsersService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*']
            }
        }
    });

    await server.register([
        {
            plugin: notes,
            options: {
                service: notesService,
                validator: NotesValidator
            }
        },
        {
            plugin: users,
            options: {
                service: usersService,
                validator: UsersValidator
            }
        }
    ]);

    await server.start();
    console.log(`Server berjalan di ${server.info.uri}`);
};

module.exports = init;
