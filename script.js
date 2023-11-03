const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const title = document.querySelector('.app__title')
const btns = document.querySelectorAll('.app__card-button')
const musicFocoInput = document.querySelector('#alternar-musica')
const startPauseBt = document.querySelector('#start-pause span')
const iconBtn = document.querySelector('.app__card-primary-butto-icon')
const timeScreen = document.querySelector('#timer')

const music = new Audio('./sons/luna-rise-part-one.mp3')
const musicPlay = new Audio('./sons/play.wav')
const musicPause = new Audio('./sons/pause.mp3')
const musicStop = new Audio('./sons/beep.mp3')

let timeSeconds = 1500
let intervalId = null

music.loop = true

musicFocoInput.addEventListener('change', () => {
  if (music.paused) {
    music.play()
  } else {
    music.pause()
  }
})

focoBt.addEventListener('click', () => {
  alterarContexto('foco')
  focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
  alterarContexto('descanso-curto')
  curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
  alterarContexto('descanso-longo')
  longoBt.classList.add('active')
})

function alterarContexto(contexto) {
  btns.forEach(function (contexto) {
    contexto.classList.remove('active')
  })

  html.setAttribute('data-contexto', contexto)
  banner.setAttribute('src', `/imagens/${contexto}.png`)

  switch (contexto) {
    case 'foco':
      title.innerHTML = `
       Otimize sua produtividade,<br />
       <strong class="app__title-strong">
        mergulhe no que importa.
       </strong>`

      break

    case 'descanso-curto':
      title.innerHTML = `
       Que tal dar uma respirada? <br />
       <strong class="app__title-strong">
        Faça uma pausa curta!
       </strong>`

      break

    case 'descanso-longo':
      title.innerHTML = `
       Hora de voltar à superfície.<br />
       <strong class="app__title-strong">
        Faça uma pausa longa.
       </strong>`

      break

    default:
      break
  }
}

const contagemRegressiva = () => {
  if (timeSeconds <= 0) {
    musicStop.play()

    alert('Tempo finalizado')

    zerar()

    return
  }

  timeSeconds -= 1

  mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
  if (intervalId) {
    musicPause.play()

    zerar()

    return
  }

  musicPlay.play()

  intervalId = setInterval(contagemRegressiva, 1000)

  startPauseBt.textContent = 'Pausar'

  iconBtn.setAttribute('src', './imagens/pause.png')
}

function zerar() {
  clearInterval(intervalId)
  startPauseBt.textContent = 'Começar'
  iconBtn.setAttribute('src', './imagens/play_arrow.png')
  intervalId = null
}

function mostrarTempo() {
  const time = timeSeconds

  timeScreen.innerHTML = `${time}`
}

mostrarTempo()
