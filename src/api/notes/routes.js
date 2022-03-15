const routes = handler => [
    {
        method: 'POST',
        path: '/notes',
        handler: handler.postNoteHandler
    },
    {
        method: 'GET',
        path: '/notes',
        handler: handler.getNotesHandler
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: handler.putNoteByIdHandler
    }
];
