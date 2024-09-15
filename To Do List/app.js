// Login Button -->
document.getElementById('btn').addEventListener('click', function(){
    alert('Kya karega Login Karke!')
})

// Switching between Pages -->

const loadContent = (page) => {
    switch (page) {
        case 'home':
            window.location.href = 'index.html';
            break; // Add break here
        case 'about':
            window.location.href = 'about.html';
            break; // Add break here
        case 'contact':
            window.location.href = 'contact.html';
            break; // Add break here
    }
};

document.getElementById('home').addEventListener('click', () => loadContent('home'));
document.getElementById('about').addEventListener('click', () => loadContent('about'));
document.getElementById('contact').addEventListener('click', () => loadContent('contact'));


// Main logic of the TO DO List APP --->

    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    addTaskBtn.addEventListener('click', ()=>{
        const taskText = taskInput.value.trim();
        if(taskText !== ''){
            const taskItem = document.createElement('li');
            taskItem.classList.add('flex', 'justify-between', 'items-center', 'bg-gray-100', 'p-2', 'mb-2', 'rounded-lg', 'shadow-sm');
            taskItem.innerHTML = `
                <span class="text-gray-800">${taskText}</span>
                <button class="deleteBtn bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
            `;
            taskList.appendChild(taskItem);
            taskInput.value = '';

            // Add delete functionality to the delete button
            taskItem.querySelector('.deleteBtn').addEventListener('click', ()=>{
                taskItem.remove();
            });
        }
    });

    // Add Enter key functionality for adding tasks
    taskInput.addEventListener('keypress', (e)=>{
        if(e.key === 'Enter'){
            addTaskBtn.click();
        }
    });
