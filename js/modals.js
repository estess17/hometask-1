const formModalOpenBtn = document.querySelector('.create');
const formModalCloseBtn = document.querySelector('.close');
const formModal = document.querySelector('.modal');
const archivedModalOpenBtn = document.querySelector('.archived');
const archivedModalCloseBtn = document.querySelector('.archived-close');
const archivedModal = document.getElementById('archived-modal');
const nameInput = document.getElementById('name');
const categoryInput = document.getElementById('category');
const contentInput = document.getElementById('content');
const createBtn = document.getElementById('createBtn');
const editBtn = document.getElementById('editBtn');

const modals = () => {
    function bindModal(trigger, modal, close) {
        trigger.addEventListener('click', (e) => {
            if (e.target) {
                e.preventDefault();
            }

            editBtn.style.display = 'none';
            createBtn.style.display = 'block';
            modal.style.display = 'block';
        });

        close.addEventListener('click', (e) => {
            if (e.target) {
                e.preventDefault();
            }

            closeModals();
        });

        modal.addEventListener('click', e => {
            if (e.target === modal) {
                closeModals();
            }
        });
    }

    bindModal(formModalOpenBtn, formModal, formModalCloseBtn);
    bindModal(archivedModalOpenBtn, archivedModal, archivedModalCloseBtn);
};

const getFormData = (note = null) => {
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

const setFormData = (note) => {
    nameInput.value = note.name;
    categoryInput.value = note.category;
    contentInput.value = note.content;
};

const closeModals = () => {
    formModal.style.display = 'none';
    archivedModal.style.display = 'none';
    nameInput.value = '';
    contentInput.value = '';
};

export {modals, formModal, getFormData, setFormData, closeModals};