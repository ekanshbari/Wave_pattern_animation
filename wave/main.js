const amplitude = 26
const width = 18
const speed = 1
let offsetX = 0


function getCanvas (selector = 'canvas') {
  return document.querySelector('canvas')
}

function getContext (canvas = getCanvas()) {
  return canvas.getContext('2d')
}

function updateSize (canvas = getCanvas()) {
  const { parentNode } = canvas
  const parent = getComputedStyle(parentNode)
  
  canvas.width = parseInt(parent.width)
  canvas.height = parseInt(parent.height)
}

function clear (color = 'black', canvas = getCanvas()) {
  const context = getContext(canvas)
  
  context.save()
  context.rect(0, 0, canvas.width, canvas.height)
  context.fillStyle = color
  context.fill()
  context.restore()
}

function drawWave (offsetX = 0, offsetY = 0, color = 'white', canvas = getCanvas()) {
  const iterationLimit = getCanvas().width
  const context = getContext(canvas)
  const waveFormula = (x) =>
    amplitude * Math.cbrt(Math.sin(x / width))
  
  context.save()
  context.beginPath()
  context.moveTo(0, waveFormula(0 + offsetX) + offsetY)

  for(let x = 0; x <= iterationLimit; x++) {
    context.lineTo(x, waveFormula(x + offsetX) + offsetY)
  }
  for(let x = iterationLimit; x >= 0; x--) {
    context.lineTo(x, waveFormula(x + offsetX) + offsetY + amplitude)
  }

  context.fillStyle = color
  context.fill()
  context.restore()
}

function fillWaves (offset = 0, canvas = getCanvas()) {
  const iterationLimit = getCanvas().height + 2 * amplitude
  
  for(let x = 0; x <= iterationLimit; x += 2 * amplitude) {
    drawWave(offset, x)
  }
}

function incrementWaveOffsetX (amount = 1) {
  offsetX = (offsetX + amount) % (2 * width * Math.PI)
}

function init (canvas = getCanvas()) {
  updateSize(canvas)
  loop(canvas)
}

function loop (canvas = getCanvas()) {
  clear('black', canvas)
  fillWaves(offsetX, canvas)
  incrementWaveOffsetX(speed)
  requestAnimationFrame(() => loop(canvas))
}


window.addEventListener('load', function () {
  const canvas = getCanvas('canvas')
  
  init(canvas)
 })
