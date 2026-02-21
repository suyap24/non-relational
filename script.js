const form = document.getElementById('studentForm');
const tableBody = document.getElementById('tableBody');

// 1. Function to Load Data
function loadData() {
    fetch('http://localhost:3000/students')
        .then(res => res.json())
        .then(data => {
            tableBody.innerHTML = "";
            data.forEach(student => {
                const row = `
                    <tr>
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.email}</td>
                        <td>${student.phone}</td>
                        <td>${student.course}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch(err => console.error("Error loading data:", err));
}

// 2. Function to Insert Data
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const studentData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        course: document.getElementById('course').value
    };

    fetch('http://localhost:3000/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
    })
    .then(res => res.json())
    .then(data => {
        alert(data.success || data.Message);
        form.reset(); // Form clear kar
        loadData();   // Table refresh kar
    })
    .catch(err => console.error("Error adding student:", err));
});

// Page load hotana data load kar
document.addEventListener('DOMContentLoaded', loadData);