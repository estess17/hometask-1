import {cutText} from './utils.js';

const tableBody = document.querySelector('.table-body');
const summaryTableBody = document.querySelector('.summary-table-body');

let notes = [
    {
        id: 0,
        name: 'Shopping list',
        created: 'April 20,2021',
        category: 'Task',
        content: 'Tomatoes, bread',
        dates: '',
        isArchive: false,
    },
    {
        id: 1,
        name: 'New Feature',
        created: 'May 05,2021',
        category: 'Idea',
        content: 'Implement new task todo list adadada 3/5/2021, 5/5/2021, Implement new task todo list adadada 3/5/2021, 5/5/2021',
        dates: '3/5/2021, 5/5/2021',
        isArchive: false,
    },
    {
        id: 2,
        name: 'Shopping list',
        created: 'April 20,2021',
        category: 'Random Thought',
        content: 'Tomatoes, bread',
        dates: '',
        isArchive: false,
    },
];

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
}

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
            <td>${summary.archived}</tr>
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

const editNote = (id) => {
    fillTables();
};


window.deleteNote = deleteNote;
window.archiveNote = archiveNote;