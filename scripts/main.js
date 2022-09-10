import {cutText} from './utils.js';

const tableBody = document.querySelector('.table-body');

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
        id: 0,
        name: 'New Feature',
        created: 'May 05,2021',
        category: 'idea',
        content: 'Implement new task todo list adadada 3/5/2021, 5/5/2021, Implement new task todo list adadada 3/5/2021, 5/5/2021',
        dates: '3/5/2021, 5/5/2021',
        isArchive: false,
    },
    {
        id: 0,
        name: 'Shopping list',
        created: 'April 20,2021',
        category: 'Task',
        content: 'Tomatoes, bread',
        dates: '',
        isArchive: false,
    },
];

const createNote = (note) => {
    let element = document.createElement('tr');
    element.innerHTML = `
        <td>${note.name}</td>
        <td>${note.created}</td>
        <td>${note.category}</td>
        <td>${cutText(note.content, 45)}</td>
        <td>${note.dates}
        <td class="table-body__icons">
            <img src="./assets/pen-to-square-solid.svg" alt="edit-icon">
            <img src="./assets/box-archive-solid.svg" alt="archive-icon">
            <img src="./assets/trash-solid.svg" alt="delete-icon" onclick="deleteNote(${note.id})">
        </td>
    `;

    return element;
};

const fillNotesList = () => {
    if (notes.length > 0) {
        notes.filter(note => !note.isArchive).map(note => tableBody.append(createNote(note)));
    } else {
        tableBody.innerHTML = 'No notes yet...';
    }
}
fillNotesList();

const deleteNote = (id) => {
    console.log(id);
};
