import {formModal, closeModals, getFormData, setFormData, modals} from './modals.js';
import {fillTables} from './tables.js';
import data from '../assets/data/notes.json' assert {type: 'json'};

let notes = data;

window.addEventListener('DOMContentLoaded', () => {
    const createBtn = document.getElementById('createBtn');
    const editBtn = document.getElementById('editBtn');

    fillTables();
    modals();

    const deleteNote = (id) => {
        notes = notes.filter(note => note.id !== id);
        fillTables();
    };

    const archiveNote = (id) => {
        notes = notes.map(note => note.id === id ? {...note, isArchive: !note.isArchive} : note);
        fillTables();
    };

    const createNote = (e) => {
        if (e.target) {
            e.preventDefault();
        }

        const note = getFormData();
        notes.push(note);

        fillTables();
        closeModals();
    };

    createBtn.addEventListener('click', createNote);

    const editNote = (id) => {
        formModal.style.display = 'block';
        editBtn.style.display = 'block';
        createBtn.style.display = 'none';

        const note = notes.find(note => note.id === id);
        setFormData(note);

        editBtn.data = {note, id};
    };

    editBtn.addEventListener('click', (e) => {
        if (e.target) {
            e.preventDefault();
        }

        const updatedNote = getFormData(editBtn.data.note);
        notes = notes.map(n => {
            return n.id === +editBtn.data.id ? updatedNote : n;
        });

        fillTables();
        closeModals();
    });


    window.deleteNote = deleteNote;
    window.archiveNote = archiveNote;
    window.editNote = editNote;
});

export {notes}