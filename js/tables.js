import {notes} from './main.js';
import {cutText} from './utils.js';

const tableBody = document.querySelector('.table-body');
const summaryTableBody = document.querySelector('.summary-table-body');
const archivedTableBody = document.querySelector('.archived-table-body');

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
                    ${note.isArchive ? 
                        `<img src="./assets/images/box-archive-solid.svg" alt="archive-icon" onclick="archiveNote(${note.id})">` 
                        :
                        `<img src="./assets/images/pen-to-square-solid.svg" alt="edit-icon" onclick="editNote(${note.id})">
                        <img src="./assets/images/box-archive-solid.svg" alt="archive-icon" onclick="archiveNote(${note.id})">
                        <img src="./assets/images/trash-solid.svg" alt="delete-icon" onclick="deleteNote(${note.id})">`
                    }
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
        archivedTableBody.innerHTML = notes.filter(note => note.isArchive).map(note => generateNote(note)).join('');
    } else {
        tableBody.innerHTML = '<h2>There are no notes yet...</h2>';
    }

    summaryTableBody.innerHTML = summary().map(summary => generateSummary(summary)).join('');
};


export {fillTables};