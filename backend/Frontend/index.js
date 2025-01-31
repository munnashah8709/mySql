document.getElementById('userForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email })
    });

    const result = await response.json();
    alert(result.message);
    fetchUsers();
    document.getElementById('userForm').reset();
});

async function fetchUsers() {
    const response = await fetch('/api/users');
    const users = await response.json();
    console.log(users);
    const userList = document.getElementById('userList');
    
    userList.innerHTML = users.map(user => `
       <li>
        ${user.name} - ${user.email}
        <button data-user='${JSON.stringify(user)}' onclick="editUser(this)" class="small-button">Edit</button>
        <button onclick="deleteUser(${user.id})" class="small1-button">Delete</button>
       </li>
       <br>
    `).join('');
}

async function editUser(button) {
    // Get the user object from the data-user attribute
    const user = JSON.parse(button.getAttribute('data-user'));  // Safely parse the user data

    console.log(user);  // Check if the user data is correct

    // Populate the form fields with the user's current details for editing
    document.getElementById('name').value = user.name;
    document.getElementById('phone').value = user.phone;
    document.getElementById('email').value = user.email;

    // Update form behavior to update user data on submission
    const form = document.getElementById('userForm');
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Get the updated values from the form fields
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;

        // Send PUT request to update the user
        const response = await fetch(`/api/users/${user.id}`, {  // Use user.id now
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, email })
        });

        const result = await response.json();
        alert(result.message);

        // Optionally, clear the form after updating
        document.getElementById('userForm').reset();

        // Optionally, refresh the user list or reload the page
        fetchUsers();
    }, { once: true });
}

async function deleteUser(id) {
    const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE'
    });

    const result = await response.json();
    alert(result.message);
    window.location.reload();

}
fetchUsers()
