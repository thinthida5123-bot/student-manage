let students = JSON.parse(localStorage.getItem('students')) || [];

async function init() {
    if (students.length === 0) {
        try {
            const response = await fetch('students.json');
            if (!response.ok) throw new Error("Could not fetch students.json");
            students = await response.json();
            localStorage.setItem('students', JSON.stringify(students));
        } catch (error) {
            console.error("Error loading initial data:", error);
        }
    }
    renderTable();
}

function renderTable(data = students) {
    const table = document.getElementById('studentTable');
    table.innerHTML = data.map((s, index) => `
        <tr class="hover:bg-slate-50 transition">
            <td class="p-5 font-medium text-slate-800">${s.name}</td>
            <td class="p-5 text-slate-600">${s.major}</td>
            <td class="p-5 text-center flex justify-center gap-2">
                <button onclick="editStudent(${index})" class="text-blue-500 hover:bg-blue-50 px-3 py-1 rounded-lg transition">Edit</button>
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

function editStudent(index) {
    const s = students[index];
    const newName = prompt("Edit Student Name:", s.name);
    const newMajor = prompt("Edit Major:", s.major);
    
    if (newName !== null && newMajor !== null) {
        students[index] = { name: newName, major: newMajor };
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
    }
}

function deleteStudent(index) {
    if(confirm("Are you sure you want to delete?")) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
    }
}

function searchStudent() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = students.filter(s => s.name.toLowerCase().includes(term));
    renderTable(filtered);
}

init();
