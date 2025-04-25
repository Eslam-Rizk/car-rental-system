const cardsPerPage = 9; 
const carCards = document.querySelectorAll('.car-card-item');
const totalCards = carCards.length;
const totalPages = Math.ceil(totalCards / cardsPerPage);
let currentPage = 1;

function showPage(page) {
    currentPage = page;
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    carCards.forEach((card, index) => {
        card.style.display = (index >= start && index < end) ? 'block' : 'none';
    });

    document.querySelectorAll('.pagination .page-item').forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.querySelector('.page-link').textContent) === page) {
            item.classList.add('active');
        }
    });

    document.getElementById('prevPage').parentElement.classList.toggle('disabled', page === 1);
    document.getElementById('nextPage').parentElement.classList.toggle('disabled', page === totalPages);
}

function generatePagination() {
    const pagination = document.getElementById('pagination');
    const prevButton = pagination.querySelector('#prevPage').parentElement;
    const nextButton = pagination.querySelector('#nextPage').parentElement;

    pagination.innerHTML = '';
    pagination.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        if (i === 1) li.classList.add('active');
        const a = document.createElement('a');
        a.classList.add('page-link');
        a.href = '#';
        a.textContent = i;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(i);
        });
        li.appendChild(a);
        pagination.appendChild(li);
    }

    pagination.appendChild(nextButton);

    document.getElementById('prevPage').addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) showPage(currentPage - 1);
    });

    document.getElementById('nextPage').addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) showPage(currentPage + 1);
    });
}

generatePagination();
showPage(1);