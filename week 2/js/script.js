let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    fetchUsers(currentPage);

    document.getElementById('next-page').addEventListener('click', () => {
        currentPage++;
        fetchUsers(currentPage);
    });

    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchUsers(currentPage);
        }
    });

    document.getElementById('go-page').addEventListener('click', () => {
        const page = parseInt(document.getElementById('page-number').value);
        if (page > 0) {
            currentPage = page;
            fetchUsers(currentPage);
        }
    });
});

function fetchUsers(page) {
    fetch(`https://reqres.in/api/users?page=${page}`)
        .then(response => response.json())
        .then(data => {
            const users = data.data;
            renderUsers(users);
        })
        .catch(error => console.error('Error fetching users:', error));
}

function renderUsers(users) {
    const userTable = document.getElementById('user-table');
    userTable.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.first_name} ${user.last_name}</td>
            <td><img src="${user.avatar}" alt="User Photo" width="50" height="50" class="rounded-circle"></td>
            <td>${user.email}</td>
        </tr>
    `).join('');
}
