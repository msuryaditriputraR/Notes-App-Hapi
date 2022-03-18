const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const { Pool } = require('pg');
const { mapDBToModel } = require('../../utils');

class NotesService {
    constructor() {
        this._pool = new Pool();
    }

    async addNote({ title, body, tags }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO notes VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
            values: [id, title, body, tags, createdAt, updatedAt]
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Catatan gagal ditambahkan');
        }
    }

    async getNotes() {
        const result = await this._pool.query('SELECT * FROM notes');
        return result.rows.map(mapDBToModel);
    }
}
