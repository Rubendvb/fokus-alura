const taskListContainer = document.querySelector('.app__section-task-list')
const formTask = document.querySelector('.app__form-add-task')
const toggleFormTaskBtn = document.querySelector('.app__button--add-task')
const formLabel = document.querySelector('.app__form-label')
const textarea = document.querySelector('.app__form-textarea')
const cancelBtn = document.querySelector('.app__form-footer__button--cancel')
const deleteBtn = document.querySelector('.app__form-footer__button--delete')
const taskActiveDescription = document.querySelector(
  '.app__section-active-task-description'
)

const localStorageTasks = localStorage.getItem('tasks')

let tasks = localStorageTasks ? JSON.parse(localStorageTasks) : []
let taskSelect = null
let itemTaskSelect = null
let taskEdit = null
let paragraphEdit = null

const taskIconSvg = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" 
  fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="12" fill="#FFF" />
  <path 
    d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E" />
</svg>`

const selectTask = (task, li) => {
  // Evita selecionar a task finalizada
  if (task.finish) {
    return
  }
  //

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
  taskEdit = null
  paragraphEdit = null

  textarea.value = ''
}

const updateTask = (task, paragraph) => {
  console.log(task, paragraph)
  if (taskEdit === task) {
    formClear()

    return
  }

  formLabel.textContent = 'Editando tarefa'
  taskEdit = task
  paragraphEdit = paragraph
  textarea.value = task.description
  formTask.classList.remove('hidden')
}

function createTask(task) {
  const li = document.createElement('li')
  li.classList.add('app__section-task-list-item')

  const svgIcon = document.createElement('svg')
  svgIcon.innerHTML = taskIconSvg

  const paragraph = document.createElement('p')
  paragraph.classList.add('app__section-task-list-item-description')

  const button = document.createElement('button')
  const editIcon = document.createElement('img')

  paragraph.textContent = task.description

  editIcon.setAttribute('src', './imagens/edit.png')

  button.classList.add('app__button-edit')
  button.appendChild(editIcon)

  button.addEventListener('click', (e) => {
    e.stopPropagation()

    updateTask(task, paragraph)
  })

  li.onclick = () => {
    selectTask(task, li)
  }

  svgIcon.addEventListener('click', (e) => {
    if (task === taskSelect) {
      e.stopPropagation()

      button.setAttribute('disable', true)
      li.classList.add('app__section-task-list-item-complete')

      taskSelect.finish = true

      updateLocalStorage()
    }
  })

  if (task.finish) {
    button.setAttribute('disable', true)
    li.classList.add('app__section-task-list-item-complete')
  }

  li.appendChild(svgIcon)
  li.appendChild(paragraph)
  li.appendChild(button)

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

  if (taskEdit) {
    taskEdit.description = textarea.value
    paragraphEdit.textContent = textarea.value
  } else {
    const task = {
      description: textarea.value,
      finish: false,
    }

    tasks.push(task)

    const taskItem = createTask(task)
    taskListContainer.appendChild(taskItem)
  }

  updateLocalStorage()

  formClear()
})

cancelBtn.addEventListener('click', () => {
  formClear()

  formTask.classList.add('hidden')
})

deleteBtn.addEventListener('click', () => {
  if (taskSelect) {
    const index = tasks.indexOf(taskSelect)

    if (index !== -1) {
      tasks.splice(index, 1)
    }

    itemTaskSelect.remove()

    tasks.filter((item) => item != taskSelect)

    itemTaskSelect = null
    taskSelect = null
  }

  updateLocalStorage()
  formClear()
})

document.addEventListener('TarefaFinalizada', function (e) {
  if (taskSelect) {
    taskSelect.finish = true
    itemTaskSelect.classList.add('app__section-task-list-item-complete')
    itemTaskSelect.querySelector('button').setAttribute('disabled', true)

    updateLocalStorage()
  }
})
