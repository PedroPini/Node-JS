const url = "http://localhost:4000";
const form = document.getElementById("newTaskForm");

// --------------------------- HELPER FUNCTIONS ----------------
// WILL ONLY DEAL WITH MANIPULATING THE UI
//GET TASK FROM THE DATABASE AND LIST INTO THE TABLE
async function displayTasks() {
    const tasks = await getTasks();
    const toDoList = document.getElementById("toDoList");

    toDoList.innerHTML = "";
    tasks.forEach(task => {
        toDoList.appendChild(formatTask(task))
    })

}


// --------------------------- API/ CALLS FUNCTIONS ----------------
//WILL ONLY DEAL WITH API CALLS


//GET ALL TASKS FROM THE DATABASE

async function getTasks(){
    try {
        const params = new URLSearchParams();
        const completed = document.getElementById("taskFilter")?.value;
        if(completed) params.set("completed", completed);
        if(document.getElementById("sortDueDate")?.checked) params.set("sort", "dueDate");

        const res = await fetch(`${url}/tasks?${params}`);
        if(!res.ok) {
            const err = await res.json();
            return console.error(err.message, res.status);
        }

        const data = await res.json();
        return data.tasks;
    } catch (error) {
        console.error("Failed to get tasks: ", error);
    }
}

//create a new task
async function createTask(){
    try {
        const taskData = {
            title: form.title.value.trim(),
            dueDate: form.dueDate.value
        }

        const res = await fetch(`${url}/tasks/new`, {
           method: "POST",
           headers: {"Content-Type": "application/json"},
           body: JSON.stringify(taskData) 
        })

        if(!res.ok){
            const err = await res.json();
            return console.error(err.message, res.status);
        }

        const data = await res.json();
        form.reset();
        displayTasks();
        console.log(data.message, data.task);
    } catch (error) {
        console.error('Failed to create task: ', error);
    }
}

function formatTask(task) {
  const tr = document.createElement("tr");
  tr.classList.add("align-middle");
  const isComplete = task.completed;
  const complete = isComplete ? "opacity-50 text-decoration-line-through" : ""
  tr.innerHTML = `
    <th scope="row" class="${complete} task-title text-truncate w-75" style="max-width: 200px;">${task.title}</th>
    <td class="${complete} task-date" data-raw="${task.dueDate}">${new Date(task.dueDate).toLocaleDateString()}</td>
    <td class="text-end">
      <div class="d-flex justify-content-end">
      ${isComplete ?
        `<button class="btn btn-icon px-2" onclick="incompleteTask('${task._id}')"><i class="bi bi-x-square text-white"></i></i></button>`
        :
        `<button class="btn btn-icon px-2" onclick="completeTask('${task._id}')"><i class="bi bi-check-square text-white"></i></i></button>`
      }
        <button class="btn btn-icon px-2" onclick="openModal('${task._id}', '${task.title}', '${task.dueDate.slice(0, 10)}')"><i class="bi bi-pencil-square text-white"></i></button>
        <button class="btn btn-icon px-2" onclick="deleteTask('${task._id}')"><i class="bi bi-trash text-white"></i></button>
      </div>
    </td>
  `;
  return tr;
}


//-----------------------------EVENT LISTENERS----------------------
window.addEventListener("DOMContentLoaded", () => {
    displayTasks();
})

//when you click the submit button on the form
form.addEventListener("submit", (event) => {
    event.preventDefault();
    createTask();
})