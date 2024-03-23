const BASE_URL = "https://65f2d1ae105614e6549efd32.mockapi.io/todos";
const addBtnEl = document.getElementById("addBtn");
const myUL = document.getElementById("myUL");
const myInput = document.getElementById("myInput");

// Function to fetch all todos
const getTodos = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch todos');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

// Function to add a todo
const addTodo = async (newTodo) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newTodo),
        });
        if (!response.ok) {
            throw new Error('Failed to add todo');
        }
    } catch (error) {
        console.error(error);
    }
};

// Function to delete a todo
const deleteTodo = async (todoId) => {
    try {
        const response = await fetch(`${BASE_URL}/${todoId}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error('Failed to delete todo');
        }
    } catch (error) {
        console.error(error);
    }
};

// Function to update a todo
const updateTodo = async (todoId, updatedTodo) => {
    try {
        const response = await fetch(`${BASE_URL}/${todoId}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedTodo),
        });
        if (!response.ok) {
            throw new Error('Failed to update todo');
        }
    } catch (error) {
        console.error(error);
    }
};

// Function to create a list item
function createLI(text, isDone, id) {
    const li = document.createElement("li");
    li.id = id; //assigning li's id same as todo's id
    myUL.appendChild(li);
    addUpdateCheckbox(li, text, isDone);
    addText(li , text);
    addCloseBtn(li);
}

// Function to fill the todo list
async function fillTodoList() {
    const todos = await getTodos();
    console.log(todos);
    alert("test");
    if (todos) {
        todos.forEach(({ text, isDone, id }) => createLI(text, isDone, id));
    }
}

// Event listener for DOMContentLoaded
window.addEventListener('DOMContentLoaded', fillTodoList);

// Function to add close button
function addCloseBtn(li) {
    const span = document.createElement("span");
    const txt = document.createTextNode("delete");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    // Event listener for close button click... meron nga palang event delegation
    // span.addEventListener('click', () => {
    //     const liId = getLiId(span);
    //     console.log("LI ID:", liId);
    //     // Perform further actions with the liId if needed
    // });
}

// Function to get the id of the corresponding li element when its close button is clicked
function getLiId(span) {
    const li = span.parentNode;
    return li.id; // Assuming the id of li element is set as todo's id
}

// Function to add update checkbox
function addUpdateCheckbox(li, text, isDone) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "update";
    checkbox.checked = isDone;
    li.appendChild(checkbox);
}

// Function to add text
function addText(li, text) {
    const span = document.createElement("span");
    const txt = document.createTextNode(text);
    span.className = "text";
    span.appendChild(txt);
    li.appendChild(span);
}

// Event listener for add button click
addBtnEl.addEventListener('click', async () => {
    const todo = myInput.value.trim();
    if (todo === '') {
        alert("Please enter a todo");
        return;
    }
    const newTodo = { "text": `${todo}`, "isDone": false };
    await addTodo(newTodo); //await for new todo to be added
    alert("test");
    // Get the ID of the newly added todo
    const newTodoId = await getNewTodoId();
    console.log("ID of the new todo:");
    
    createLI(todo, false, newTodoId);

});

// Event listener for close button clicks using event delegation
document.addEventListener('click', async (event) => {
    const target = event.target;
    if (target.classList.contains('close')) {
        // alert(target.parentNode.className)
        const liId = getLiId(target);
        // alert(liId);
        // Perform further actions with the liId if needed
        await deleteTodo(liId);
        // Remove the corresponding li element from the DOM
        target.parentNode.remove();
    }
});

// Event listener for checkbox clicks using event delegation
myUL.addEventListener('change', async (event) => {
    const target = event.target;
    if (target.classList.contains('update')) {
        const liId = getLiId(target);
        const isChecked = target.checked;
        console.log("Updating LI with ID:", liId, "Is Done:", isChecked);
        await updateTodo(liId, { isDone: isChecked });
    }
});

// Function to get the ID of the newly added todo
async function getNewTodoId() {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch todos');
        }
        const todos = await response.json();
        // Assuming the new todo has the highest ID
        console.log(todos);
        alert(todos);
        return Math.max(...todos.map(todo => parseInt(todo.id)));
    } catch (error) {
        console.error(error);
    }
}