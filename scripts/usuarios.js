if (!localStorage.getItem('loggedInUser')) {
    alert('Você precisa estar logado para acessar esta página.');
    window.location.href = 'login.html';
  }
  
  const userForm = document.getElementById('userForm');
  const usersTableBody = document.querySelector('#usersTable tbody');
  const logoutBtn = document.getElementById('logoutBtn');
  
  let users = [];
  
  const savedUsers = localStorage.getItem('libraryUsers');
  if (savedUsers) {
    users = JSON.parse(savedUsers);
    renderUsers();
  }
  
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
  });
  
  userForm.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const role = document.getElementById('role').value;
    const loanLimit = parseInt(document.getElementById('loanLimit').value);
    const penalty = document.getElementById('penalty').checked;
    const suspended = document.getElementById('suspended').checked;
  
    if (!name || !role || isNaN(loanLimit)) {
      alert('Preencha todos os campos corretamente!');
      return;
    }
  
    if (loanLimit < 1 || loanLimit > 10) {
      alert('Limite de empréstimos deve ser entre 1 e 10.');
      return;
    }
  
    const user = {
      id: Date.now(),
      name,
      role,
      loanLimit,
      penalty,
      suspended
    };
  
    users.push(user);
    saveUsers();
    renderUsers();
  
    userForm.reset();
  });
  
  function renderUsers() {
    usersTableBody.innerHTML = '';
  
    users.forEach(user => {
      const tr = document.createElement('tr');
  
      tr.innerHTML = `
        <td>${user.name}</td>
        <td>${user.role}</td>
        <td>${user.loanLimit}</td>
        <td class="${user.penalty ? 'penalty' : ''}">${user.penalty ? 'Sim' : 'Não'}</td>
        <td class="${user.suspended ? 'suspended' : ''}">${user.suspended ? 'Sim' : 'Não'}</td>
        <td>
          <button class="deleteBtn" data-id="${user.id}">Excluir</button>
        </td>
      `;
  
      usersTableBody.appendChild(tr);
    });
  
    document.querySelectorAll('.deleteBtn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        deleteUser(id);
      });
    });
  }
  
  function deleteUser(id) {
    users = users.filter(user => user.id != id);
    saveUsers();
    renderUsers();
  }
  
  function saveUsers() {
    localStorage.setItem('libraryUsers', JSON.stringify(users));
  }
  