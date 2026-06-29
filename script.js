let students = JSON.parse(localStorage.getItem('students')) || [];

function renderTable(data = students) {
    const table = document.getElementById('studentTable');
    table.innerHTML = data.map((s, index) => `
        <tr class="hover:bg-slate-50 transition">
            <td class="p-5 font-medium text-slate-800">${s.name}</td>
            <td class="p-5 text-slate-600">${s.major}</td>
            <td class="p-5 text-center">
                <button onclick="deleteStudent(${index})" class="text-red-500 hover:bg-red-50 px-3 py-1 rounded-lg transition">Delete</button>
            </td>
        </tr>
    `).join('');
}

function addStudent() {
    const name = document.getElementById('nameInput');
    const major = document.getElementById('majorInput');
    if(!name.value || !major.value) return alert("Please fill all fields!");
    
    students.push({ name: name.value, major: major.value });
    localStorage.setItem('students', JSON.stringify(students));
    name.value = ''; major.value = '';
    renderTable();
}

function searchStudent() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = students.filter(s => s.name.toLowerCase().includes(term));
    renderTable(filtered);
}

function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderTable();
}

renderTable();
