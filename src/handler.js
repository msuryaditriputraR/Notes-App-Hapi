// NOTE: Import library NanoId utk men-generate id yang unik
const { nanoid } = require('nanoid');
const notes = require('./notes');

// NOTE: Handler Menambahkan Note
const addNoteHandler = (request, h) => {
    const { title = 'untitled', tags, body } = request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        id,
        title,
        createdAt,
        updatedAt,
        tags,
        body
    };

    notes.push(newNote);

    const isSuccess = notes.filter(note => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan Berhasil Ditambahkan',
            data: {
                noteId: id
            }
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan Gagal Ditambahkan'
    });
    response.code(500);
    return response;
};

// NOTE: Handler Mendapatkan semua note
const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes
    }
});

// NOTE: Handler mendapatkan note berdasarkan id
const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const note = notes.filter(n => n.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note
            }
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan Tidak Ditemukan'
    });
    response.code(404);
    return response;
};

// NOTE: Handler mengedit Note
const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex(note => note.id === id);

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        };

        const response = h.response({
            status: 'success',
            message: 'Catatan Berhasil Diubah'
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan Gagal Diubah. Id tidak ditemukan'
    });
    response.code(404);
    return response;
};

// NOTE: Handler Menghapus Note
const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex(note => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan Berhasil Dihapus'
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan Gagal Dihapus. Id Tidak Ditemukan'
    });
    response.code(404);
    return response;
};

module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler
};
