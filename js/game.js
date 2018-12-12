import { game_config } from './game_config'
import { Graphics, app } from './graphics'
import { Keyboard, Mouse, Gamepad } from './interaction'
import { World } from './world'

class Game {

  constructor() {
    this._graphics = new Graphics()
    this._world
  }

  //
  // Start Game
  //
  Start(lvl = 0) {
    // load config
    Clone(require('../data/config.json'), game_config)

    // init graphics
    this._graphics.Init(document.getElementById('game-wrap'))

    // proceed when textures are loaded
    const pics = require('../data/images/**/*.png') // all PNG's in data/images/
    console.log(pics)
    Graphics.LoadTextures(pics,
      // create game world
      '', () => {
        this._world = new World(lvl)
        this._graphics.AddScene(this._world.scene)
      })

    // start event listening
    Keyboard.Listen()
    Mouse.Listen()
    Gamepad.Listen()

    app.ticker.add(this._GameLoop.bind(this, app.ticker.elapsedMS))
  }

  _GameLoop(dt) {
    const max_timestep = 60
    if (dt > max_timestep) dt = max_timestep
    Keyboard.Update(dt)
    Gamepad.Update(dt)
    if (this._world) this._world.Update(dt)
  }
}

//
// Clone Object
//
function Clone(src, tar) {
  for (let prop in src) {
    if (src.hasOwnProperty(prop)) {
      tar[prop] = src[prop]
    }
  }
}

export { Game }
