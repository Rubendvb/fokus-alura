const taskListContainer = document.querySelector('.app__section-task-list')
const formTask = document.querySelector('.app__form-add-task')
const toggleFormTaskBtn = document.querySelector('.app__button--add-task')
const formLabel = document.querySelector('.app__form-label')
const textarea = document.querySelector('.app__form-textarea')
const cancelBtn = document.querySelector('.app__form-footer__button--cancel')
const taskActiveDescription = document.querySelector(
  '.app__section-active-task-description'
)

const localStorageTasks = localStorage.getItem('tasks')

let tasks = localStorageTasks ? JSON.parse(localStorageTasks) : []
let taskSelect = null
let itemTaskSelect = null

const taskIconSvg = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" 
  fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="12" fill="#FFF" />
  <path 
    d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E" />
</svg>`

const selectTask = (task, li) => {
  if (itemTaskSelect) {
    itemTaskSelect.classList.remove('app__section-task-list-item-active')
  }

  if (taskSelect == task) {
    taskActiveDescription.textContent = null
    itemTaskSelect = null
    taskSelect = null

    return
  }

  li.classList.add('app__section-task-list-item-active')

  taskActiveDescription.textContent = task.description

  taskSelect = task
  itemTaskSelect = li
}

const formClear = () => {
  textarea.value = ''
}

function createTask(task) {
  const li = document.createElement('li')
  li.classList.add('app__section-task-list-item')

  const svgIcon = document.createElement('svg')
  svgIcon.innerHTML = taskIconSvg

  const paragraph = document.createElement('p')
  paragraph.classList.add('app__section-task-list-item-description')

  paragraph.textContent = task.description

  li.onclick = () => {
    selectTask(task, li)
  }

  li.appendChild(svgIcon)
  li.appendChild(paragraph)

  return li
}

tasks.forEach((task) => {
  const taskItem = createTask(task)

  taskListContainer.appendChild(taskItem)
})

toggleFormTaskBtn.addEventListener('click', () => {
  formLabel.textContent = 'Adicionando tarefa'
  formTask.classList.toggle('hidden')
})

const updateLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

formTask.addEventListener('submit', (e) => {
  e.preventDefault()

  const task = {
    description: textarea.value,
    finish: false,
  }

  tasks.push(task)

  const taskItem = createTask(task)
  taskListContainer.appendChild(taskItem)

  updateLocalStorage()

  formClear()
})

cancelBtn.addEventListener('click', () => {
  formClear()

  formTask.classList.add('hidden')
})
