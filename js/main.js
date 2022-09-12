import {cutText} from './utils.js';
import {modal, closeModal, getFormData, setFormData} from './modal.js';
import data from '../data/notes.json' assert {type: 'json'};


window.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('.table-body');
    const summaryTableBody = document.querySelector('.summary-table-body');
    const createBtn = document.getElementById('createBtn');
    const editBtn = document.getElementById('editBtn');

    let notes = data;

    const summary = () => {
        return [
            {
                category: 'Task',
                active: notes.filter(note => note.category === 'Task' && !note.isArchive).length,
                archived: notes.filter(note => note.category === 'Task' && note.isArchive).length,
            },
            {
                category: 'Idea',
                active: notes.filter(note => note.category === 'Idea' && !note.isArchive).length,
                archived: notes.filter(note => note.category === 'Idea' && note.isArchive).length,
            },
            {
                category: 'Random Thought',
                active: notes.filter(note => note.category === 'Random Thought' && !note.isArchive).length,
                archived: notes.filter(note => note.category === 'Random Thought' && note.isArchive).length,
            },
        ];
    };

    const generateNote = (note) => {
        return `
            <tr>
                <td>${note.name}</td>
                <td>${note.created}</td>
                <td>${note.category}</td>
                <td>${cutText(note.content, 45)}</td>
                <td>${note.dates}
                <td class="table-body__icons">
                    <img src="./assets/pen-to-square-solid.svg" alt="edit-icon" onclick="editNote(${note.id})">
                    <img src="./assets/box-archive-solid.svg" alt="archive-icon" onclick="archiveNote(${note.id})">
                    <img src="./assets/trash-solid.svg" alt="delete-icon" onclick="deleteNote(${note.id})">
                </td>
            </tr>
        `;
    };

    const generateSummary = (summary) => {
        return `
            <tr>
                <td>${summary.category}</td>
                <td>${summary.active}</td>   
                <td>${summary.archived}</td>
             </tr>
        `;
    };

    const fillTables = () => {
        if (notes.length > 0 && notes.some(note => !note.isArchive)) {
            tableBody.innerHTML = notes.filter(note => !note.isArchive).map(note => generateNote(note)).join('');
        } else {
            tableBody.innerHTML = '<h2>There are no notes yet...</h2>';
        }

        summaryTableBody.innerHTML = summary().map(summary => generateSummary(summary)).join('');
    };
    fillTables();

    const deleteNote = (id) => {
        notes = notes.filter(note => note.id !== id);
        fillTables();
    };

    const archiveNote = (id) => {
        notes = notes.map(note => note.id === id ? {...note, isArchive: true} : note);
        fillTables();
    };

    const createNote = (e) => {
        if (e.target) {
            e.preventDefault();
        }

        const note = getFormData();
        notes.push(note);

        fillTables();
        closeModal();
    };
    createBtn.addEventListener('click', createNote);

    const editNote = (id) => {
        modal.style.display = 'block';
        editBtn.style.display = 'block';
        createBtn.style.display = 'none';

        const note = notes.find(note => note.id === id);
        setFormData(note);

        editBtn.addEventListener('click', e => {
            const updatedNote = getFormData(note);
            notes = notes.map(n => n.id === id ? updatedNote : n);
            fillTables();
            modal.style.display = 'none';
        });
    };


    window.deleteNote = deleteNote;
    window.archiveNote = archiveNote;
    window.editNote = editNote;
});
