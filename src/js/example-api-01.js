const BASE_URL = "https://65f2d1ae105614e6549efd32.mockapi.io/todos";

//GET ALL TODOS
const getTodos = () => {
    return fetch(BASE_URL).then((res) => res.json());
}

//ADD or POST
const addTodo = (newTodo) => {
    return fetch(BASE_URL, {
        method: "POST",
        headers: {"Content-Type" : "application/json", },
        body: JSON.stringify(newTodo),
    });
}


const addBtnEl = document.getElementById("addBtn");
const myUL = document.getElementById("myUL");
const myInput = document.getElementById("myInput");

//CREATE LIST
function createLI (text, isDone=false, id) {
    let li = document.createElement("li");
    li.innerText = text;
    myUL.appendChild(li);
    addCloseBtn(li);
}

function fillTodoList() {
    getTodos().then((todos) => {
        todos.forEach(({text, isDone, id}) => createLI(text, isDone, id));
    });
}

window.addEventListener('DOMContentLoaded', fillTodoList);

function addCloseBtn(li) {
    let span = document.createElement("span");
    let span2 = document.createElement("span");
    // let txt = document.createTextNode('\u00D7');
    let txt = document.createTextNode("delete");
    let txt2 = document.createTextNode("update");
    span.className = "close";
    span.appendChild(txt);
    span2.className = "update";
    span2.appendChild(txt2);
    li.appendChild(span2);
    li.appendChild(span);

}

addBtnEl.addEventListener('click', () => {
    let todo = myInput.value.trim();
    if (todo ==='') {
        alert("Please enter todo");
        return;
    }
    createLI(todo);
    let newTodo = {"text": `${todo}`, "isDone": false,};
    addTodo(newTodo);
})