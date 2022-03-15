const routes = handler => [
    {
        method: 'POST',
        path: '/notes',
        handler: handler.postNoteHandler
    }
];
