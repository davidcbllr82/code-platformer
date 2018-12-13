import { Weapon } from './weapon'
import { Vec2D } from './../math'

/*
 * Firearm Class
 * any kind of shootable weapon
 */
class Firearm extends Weapon {
  constructor(pos, cooldown) {
    super(pos, cooldown)
  }

  /*
   * Shoot projectile given as parameter and return recoil
   */
  Shoot() {
    if (!this.ammunition) throw new Error('undefined ammunition')
    if (this._hasCooldown) return new Vec2D(0, 0)
    const projectile = new this.ammunition(this)
    this._SpawnProjectile(projectile)
    return Vec2D.Mult(Vec2D.Mult(Vec2D.Normalize(projectile.vel), -1), projectile.GetImpulse())
  }


}

export { Firearm }
