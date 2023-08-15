<template>
  <block>
    <div>
    </div>
  </block>
</template>
    
<script setup>
import * as PIXI from 'https://cdn.skypack.dev/pixi.js@7.2.1';
import Victor from 'https://cdn.skypack.dev/victor';

console.clear();

const SHOW_FLOW_FIELD = false;
const PARTICLE_COUNT = 30000;
const GRID_RESOLUTION = 30;

function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

class Walker {
  constructor(texture, size, radius) {
    this.radius = radius
    this.size = size;
    this.speed = 0;
    this.startSpeed = 10;
    this.hue = 0;
    this.sparkleCount = 1;
    this.vectorWeight = 1;

    this.sprite = new PIXI.Sprite(texture);
    this.sprite.anchor.set(0.5);
    this.vector = new Victor(Math.random() * 2 - 1, Math.random() * 2 - 1)

    this.sprite.x = (this.size.x * 0.5) * (this.size.grid + this.size.gutter)
    this.sprite.y = (this.size.y * 0.5) * (this.size.grid + this.size.gutter)
    this.sprite.scale.set(0)
  }

  reset(position, direction, distance, hue, explode) {
    this.hue = hue
    this.startSpeed = Math.max(3, Math.min(explode ? 15 : 10, distance))
    this.vector = direction
    this.sparkleCount = 0.2;
    this.speed = this.startSpeed * (explode ? 0.7 + Math.random() * 0.3 : Math.random() * 1);
    this.sprite.x = position.x;
    this.sprite.y = position.y;
    if (explode) this.vectorWeight = 0;

  }

  move(gridVector, delta) {

    this.vectorWeight += 0.05 * delta;
    if (this.vectorWeight > 1) this.vectorWeight = 1;
    this.speed -= 0.06 * delta;
    if (this.speed <= 0.06) this.speed = 0

    this.vector.mix(gridVector, 0.7 * this.vectorWeight).normalize()

    let newX = this.sprite.x + this.vector.x * this.speed;
    let newY = this.sprite.y + this.vector.y * this.speed;

    const TL = new Victor(this.radius, this.radius);
    const BR = new Victor(
      this.size.x * (this.size.grid + this.size.gutter) - this.radius,
      this.size.y * (this.size.grid + this.size.gutter) - this.radius
    )

    if (newX < TL.x || newX > BR.x) this.vector.invertX();
    if (newY < TL.y || newY > BR.y) this.vector.invertY();

    if (newX < TL.x) this.sprite.x = TL.x;
    if (newX > BR.x) this.sprite.x = BR.x;

    if (newY < TL.y) this.sprite.y = TL.y;
    if (newY > BR.y) this.sprite.y = BR.y;

    this.sprite.x += (this.vector.x * delta) * this.speed;
    this.sprite.y += (this.vector.y * delta) * this.speed;


    if (this.speed > 4 && Math.random() > 0.99) this.sparkleCount = 1;
    this.sparkleCount -= 0.1;
    if (this.sparkleCount < 0) this.sparkleCount = 0;

    const sparkling = this.sparkleCount > 0 && this.speed > 0.1

    this.sprite.scale.set(sparkling ? 1 : this.speed / this.startSpeed)
    this.sprite.tint = hslToHex(this.hue, 100, 50 + (sparkling ? 50 : 0))

  }

  clampX(x) {
    return Math.max(0, Math.min(this.size.x - 1, Math.round(x)))
  }

  clampY(y) {
    return Math.max(0, Math.min(this.size.y - 1, Math.round(y)))
  }

  get x() { return this.clampX(this.sprite.x / (this.size.grid + this.size.gutter)) }
  get y() { return this.clampY(this.sprite.y / (this.size.grid + this.size.gutter)) }
}

class App {
  constructor() {
    this.pixi = new PIXI.Application({ background: '#1c1c1c', resizeTo: window });
    document.body.appendChild(this.pixi.view);

    this.size = {
      grid: GRID_RESOLUTION,
      gutter: 1,
      border: 0,
      x: 0,
      y: 0
    }

    this.hueCount = 0;

    this.walkers = [];
    this.walkerTotal = PARTICLE_COUNT;
    this.walkerCount = 0;
    this.interacted = false;
    this.cursorPoints = []
    this.cursorPosition = new Victor(0, 0);
    this.cursorDirection = new Victor(0, 0);

    let arrowGraphic = new PIXI.Graphics()

    arrowGraphic.lineStyle(0);
    arrowGraphic.beginFill(0xffffff, 1);
    arrowGraphic.drawPolygon([
      this.size.grid * 0.6, this.size.grid * 0.35,
      this.size.grid * 0.8, this.size.grid * 0.5,
      this.size.grid * 0.6, this.size.grid * 0.65,
    ])
    arrowGraphic.drawRect(this.size.grid * 0.1, this.size.grid * 0.5 - 0.5, this.size.grid * 0.5, 1);
    arrowGraphic.endFill();

    this.arrowTexture = this.pixi.renderer.generateTexture(arrowGraphic);

    this.points = 0;
    this.grid = null;
    this.arrows = [];

    this.container = new PIXI.Container();
    this.pixi.stage.addChild(this.container);

    this.pixi.renderer.on('resize', () => this.onResize())
    this.pixi.stage.interactive = true;
    this.pixi.stage.hitArea = this.pixi.screen;

    this.pixi.stage.on("pointermove", (e) => {
      this.interacted = true;
      const pos = e.data.global;
      const newPositionVector = new Victor(pos.x - Math.max(0, this.size.border * 2), pos.y - Math.max(0, this.size.border * 2))

      // this.cursorMoved = true;
      const distance = newPositionVector.distance(this.cursorPosition)
      const newDirectionVector = newPositionVector.clone().subtract(this.cursorPosition)
      this.cursorPosition.copy(newPositionVector)
      this.cursorDirection.mix(newDirectionVector, 0.9)

      this.cursorPoints.push({
        position: this.cursorPosition.clone(),
        direction: this.cursorDirection.clone(),
        distance
      })
    });

    this.pixi.stage.on("click", (e) => {
      // console.log(e.data.global)
      const pos = e.data.global;
      for (let i = 0; i < 10; i++) {
        this.cursorPoints.push({
          position: new Victor(pos.x, pos.y),
          direction: new Victor(Math.random() * 2 - 1, Math.random() * 2 - 1),
          distance: 30,
          explode: true
        })
      }
    })

    this.onResize()

    this.pixi.ticker.add((delta) => this.tick(delta));

  }

  setFlowField() {
    for (let i = 0; i < this.points * 2; i += 2) {
      this.grid[i] = Math.sin(i * 0.1); //Math.random() * 2 - 1
      this.grid[i + 1] = Math.sin((i + 1) * 0.05);  //Math.random() * 2 - 1
    }
  }

  clearApp() {
    while (this.arrows.length > this.points) {
      let a = this.arrows.pop();
      a.destroy()
    }

  }

  onResize() {

    this.size.x = Math.floor((this.pixi.screen.width - this.size.gutter - this.size.border * 2) / (this.size.grid + this.size.gutter));
    this.size.y = Math.floor((this.pixi.screen.height - this.size.gutter - this.size.border * 2) / (this.size.grid + this.size.gutter));

    this.points = this.size.x * this.size.y;

    // grid has 2 data points per grid space [x, y]

    this.grid = new Float32Array(this.points * 2);
    this.flow = new Float32Array(this.points * 2);

    this.setFlowField();

    this.container.x = (this.pixi.screen.width - ((this.size.grid + this.size.gutter) * this.size.x)) * 0.5
    this.container.y = (this.pixi.screen.height - ((this.size.grid + this.size.gutter) * this.size.y)) * 0.5

    this.clearApp();

    if (SHOW_FLOW_FIELD) this.drawGrid();
    this.createWalkers();

  }

  createWalkers() {


    if (!this.walkersContainer) {
      let circleGraphic = new PIXI.Graphics()
      const radius = 4;

      circleGraphic.lineStyle(0);
      circleGraphic.beginFill(0xFFFFFF, 1);
      circleGraphic.drawCircle(radius * 0.5, radius * 0.5, radius);
      circleGraphic.endFill();

      const circleTexture = this.pixi.renderer.generateTexture(circleGraphic);

      this.walkersContainer = new PIXI.ParticleContainer(this.walkerTotal, {
        position: true,
        scale: true,
        tint: true
      });

      this.container.addChild(this.walkersContainer)

      for (let i = 0; i < this.walkerTotal; i++) {
        const walker = new Walker(circleTexture, this.size, radius);
        this.walkers.push(walker);
        this.walkersContainer.addChild(walker.sprite);
      }
    }

  }

  drawGrid() {

    if (!this.drawnGrid) {
      this.drawnGrid = new PIXI.Graphics();
      this.container.addChild(this.drawnGrid);
    }

    if (!this.arrowsContainer) {
      this.arrowsContainer = new PIXI.ParticleContainer(this.points, {
        rotation: true,
        // scale: true
      });

      this.arrowsContainer.autoResize = true;

      this.container.addChild(this.arrowsContainer)
    }

    this.drawnGrid.clear();
    let row = -1;
    this.drawnGrid.beginFill(0x2d2d2d);

    for (let i = 0; i < this.points; i++) {
      if (i % this.size.x === 0) row++

      const x = (i % this.size.x) * (this.size.grid + this.size.gutter);
      const y = row * (this.size.grid + this.size.gutter);

      // grid

      this.drawnGrid.drawRect(
        x,
        y,
        this.size.grid,
        this.size.grid
      );

      //arrow

      if (!this.arrows[i]) {
        const sprite = new PIXI.Sprite(this.arrowTexture);
        sprite.anchor.set(0.5);
        this.arrows.push(sprite);
        this.arrowsContainer.addChild(sprite);
      }

      this.arrows[i].x = x + this.size.grid * 0.5;
      this.arrows[i].y = y + this.size.grid * 0.5;
    }

    this.drawnGrid.endFill();
  }

  tick(delta) {

    delta = delta * 1
    // console.log(del)

    // update flow

    for (let i = 0; i < this.grid.length; i++) {
      let values = []
      values.push(this.grid[i - this.size.x + 1] || 0)
      values.push(this.grid[i - this.size.x] || 0)
      values.push(this.grid[i - this.size.x - 1] || 0)

      values.push(this.grid[i - 1] || 0)
      values.push(this.grid[i] * 1)
      values.push(this.grid[i + 1] || 0)

      values.push(this.grid[i + this.size.x - 1] || 0)
      values.push(this.grid[i + this.size.x] || 0)
      values.push(this.grid[i + this.size.x + 1] || 0)


      const sum = values.reduce((partialSum, a) => {
        if (a === null) return partialSum
        return partialSum + a
      }, 0)

      this.flow[i] = sum / values.length
    }

    for (let i = 0; i < this.grid.length; i += 2) {

      const flowVector = new Victor(this.flow[i], this.flow[i + 1])
      const gridVector = new Victor(this.grid[i], this.grid[i + 1])
      flowVector.normalize()

      const newVector = gridVector.clone().mix(flowVector, 0.01 * delta)

      this.grid[i] = newVector.x
      this.grid[i + 1] = newVector.y
    }

    for (let i = 0; i < this.arrows.length; i++) {
      const arrow = this.arrows[i];
      const vector = new Victor(this.grid[i * 2], this.grid[i * 2 + 1])
      arrow.angle = vector.angleDeg();
    }

    if (!this.interacted && this.hueCount < 400) {
      const w = (this.size.x * (this.size.grid + this.size.gutter))
      const h = (this.size.y * (this.size.grid + this.size.gutter))

      const d = w > h ? h : w

      const rx = Math.cos(this.hueCount * 0.025)
      const ry = Math.sin(this.hueCount * 0.025)
      const width = (w * 0.5) + (d * 0.2) * rx
      const height = (h * 0.5) + (d * 0.2) * ry

      this.cursorPoints.push({
        position: new Victor(width, height),
        direction: new Victor(rx, ry).rotateByDeg(-45),
        distance: 9
      })
    }

    if (this.cursorPoints.length && this.walkers.length) {

      while (this.cursorPoints.length) {
        const point = this.cursorPoints.pop()

        const spawnCount = point.explode ? this.walkerTotal * 0.006 : Math.max(2, Math.min(this.walkerTotal * 0.003, Math.round(point.distance * 5)))


        for (var i = 0; i < spawnCount; i++) {


          const theChoosenOne = this.walkers[this.walkerCount % this.walkerTotal];
          theChoosenOne.reset(
            point.position,
            point.direction.clone().mix(new Victor(Math.random() * 2 - 1, Math.random() * 2 - 1), 0.5 * delta).normalize(),
            point.distance,
            this.hueCount % 255,
            point.explode

          )
          this.walkerCount += 2;

          if (point.explode) this.hueCount += 0.25 * delta
        }
      }

      this.hueCount += 5 * delta
    }


    this.walkers.forEach(walker => {
      if (walker.speed > 0) {
        let x = walker.x;
        let y = walker.y;
        let i = (x + ((y) * this.size.x)) * 2

        const gridVector = new Victor(this.grid[i], this.grid[i + 1])
        walker.move(gridVector, delta);

        gridVector.mix(walker.vector, Math.min(1, walker.speed * 0.1))
        this.grid[i] = gridVector.x
        this.grid[i + 1] = gridVector.y
      }
    })


  }
}

// const app = new App()

</script>
<style scoped></style>