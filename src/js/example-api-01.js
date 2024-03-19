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

// Function to create a list item
function createLI(text, isDone = false, id) {
    const li = document.createElement("li");
    // li.innerText = "";
    myUL.appendChild(li);
    addUpdateCheckbox(li, text, isDone);
    addText(li , text);
    addCloseBtn(li);
}

// Function to fill the todo list
async function fillTodoList() {
    const todos = await getTodos();
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
}

// Function to add update checkbox
function addUpdateCheckbox(li, text, isDone) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "update";
    // checkbox.innerText = text;
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
addBtnEl.addEventListener('click', () => {
    const todo = myInput.value.trim();
    if (todo === '') {
        alert("Please enter a todo");
        return;
    }
    createLI(todo);
    const newTodo = { "text": `${todo}`, "isDone": false };
    addTodo(newTodo);
});