const open = document.querySelector('.create');
const close = document.querySelector('.close');
export const modal = document.querySelector('.modal');
export const nameInput = document.getElementById('name');
export const categoryInput = document.getElementById('category');
export const contentInput = document.getElementById('content');
const createBtn = document.getElementById('createBtn');
const editBtn = document.getElementById('editBtn');

open.addEventListener('click', e => {
    if (e.target) {
        e.preventDefault();
    }


    editBtn.style.display = 'none';
    createBtn.style.display = 'block';
    modal.style.display = 'block';
});

close.addEventListener('click', e => {
    if (e.target) {
        e.preventDefault();
    }

    closeModal();
});

modal.addEventListener('click', e => {
    if (e.target === modal) {
        closeModal();
    }
});

export const getFormData = (note = null) => {
   let dates = contentInput.value.match(/(\d{1,2}([.\-/])\d{1,2}([.\-/])\d{4})/g);

    return {
        id: note ? note.id : Math.random(),
        name: nameInput.value,
        created: note ?
            note.created :
            new Date().toLocaleDateString('default', {month: 'long', day: '2-digit', year: 'numeric'}),
        category: categoryInput.value,
        content: contentInput.value,
        dates: dates ? dates.join(', ') : '',
        isArchive: note ? note.isArchive : false,
    };
};

export const setFormData = (note) => {
    nameInput.value = note.name;
    categoryInput.value = note.category;
    contentInput.value = note.content;
};

export const closeModal = () => {
    modal.style.display = 'none';

    nameInput.value = '';
    categoryInput.value = '';
    contentInput.value = '';
};