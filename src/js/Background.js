import Point from './Point';
import Rect from './Rect';
import Color from './Color';

export default class Background {
  /**
   * @param {Element} canvasElement
   * @param {{pointCount: Number, pointSpeed: Number}} config
   */
  constructor (canvasElement, config = {pointCount: 50, pointSpeed: 50}) {
    this.pointSpeed = config.pointSpeed;
    let totalPointCount = config.pointCount;
    this.canvas = canvasElement;
    this.context = this.canvas.getContext('2d');
    this.rect = new Rect(0, 0, parseFloat(window.innerWidth), parseFloat(window.innerHeight));

    this.canvas.setAttribute('width', this.rect.Width);
    this.canvas.setAttribute('height', this.rect.Height);

    this.maxDistance = 260;

    this.points = [];
    for (let i = 0; i < totalPointCount; i++) {
      let pos = this.getRandomPos(true);

      this.points.push({
        pos: pos,
        velocity: this.getRandomVelocity(pos),
        color: new Color(230, 230, 230, 1),
        r: 2,
        phase: Math.random() * 10
      });
    }

    this.mousePoint = Object.assign({}, this.points[0]);
    this.mousePoint.alpha = 0;
    this.points.push(this.mousePoint);

    this.lastFrame = Date.now();

    // Subscribe events.
    window.addEventListener('resize', this.resize.bind(this));

    window.addEventListener('mouseenter', () => {
      this.mousePoint.velocity = new Point(0, 0);
    });
    window.addEventListener('mouseleave', () => {
      this.mousePoint.pos = new Point(0, 0);
    });
    window.addEventListener('mousemove', (event) => {
      this.mousePoint.pos.X = event.clientX;
      this.mousePoint.pos.Y = event.clientY;
    });
  }

  getRandomPos (anywhere) {
    let point = new Point(Math.random() * this.rect.width, Math.random() * this.rect.height);
    if (anywhere) {
      return point;
    }
    switch (Math.ceil(Math.random() * 4) - 1) {
      case 0:
        point.x = 0; break;
      case 1:
        point.x = this.rect.width; break;
      case 2:
        point.y = 0; break;
      case 3:
        point.y = this.rect.height; break;
    }
    return point;
  }

  getRandomVelocity (point) {
    let vel = new Point(Math.random(), Math.random());
    if (!this.rect.inside(point, -10)) {
      vel.x *= point.x === 0 ? 1 : -1;
      vel.y *= point.y === 0 ? 1 : -1;
    }

    return vel;
  }

  update (delta) {
    this.points.forEach((point) => {
      // Update position with velocity times delta.
      point.pos.X += (point.velocity.X / this.pointSpeed) * delta;
      point.pos.Y += (point.velocity.Y / this.pointSpeed) * delta;

      if (!this.rect.inside(point.pos, 50)) {
        // When a point is outside of the actual canvas, we just reset its position
        // to a random position (which is at one of the edges) and push it in a velocity towards a given direction.
        point.pos = this.getRandomPos();
        point.velocity = this.getRandomVelocity(point.pos);
        point.phase = Math.random() * 10;
      }

      point.phase += 0.003;
      point.color.Alpha = Math.abs(Math.cos(point.phase));
    });
  }

  resize () {
    this.rect.Width = parseFloat(document.body.clientWidth);
    this.rect.Height = parseFloat(window.innerHeight);
    this.canvas.setAttribute('width', this.rect.Width);
    this.canvas.setAttribute('height', this.rect.Height);
  }

  render () {
    let frameDeltaTime = Date.now() - this.lastFrame;
    this.context.clearRect(this.rect.X, this.rect.Y, this.rect.Width, this.rect.Height);
    this.drawPoints();
    this.drawLines();
    this.update(frameDeltaTime);
    this.lastFrame = Date.now();
    window.requestAnimationFrame(this.render.bind(this));
  }

  drawPoints () {
    this.points.forEach((point) => {
      if (!point.hasOwnProperty('type')) {
        let pos = point.pos;
        this.context.fillStyle = `rgba(${point.color.Red}, ${point.color.Green}, ${point.color.Blue}, ${point.color.Alpha})`;
        this.context.beginPath();
        this.context.arc(pos.X, pos.Y, point.r, 0, Math.PI * 2, true);
        this.context.closePath();
        this.context.fill();
      }
    });
  }

  drawLines () {
    let fraction, alpha;
    for (let i = 0; i < this.points.length; i++) {
      for (let j = i + 1; j < this.points.length; j++) {
        let a = this.points[i];
        let b = this.points[j];

        fraction = Math.sqrt((Math.pow(a.pos.X - b.pos.X, 2)) + (Math.pow(a.pos.Y - b.pos.Y, 2))) / this.maxDistance;
        if (fraction < 1) {
          alpha = (1.0 - fraction);
          this.context.strokeStyle = `rgba(150, 150, 150, ${alpha})`;
          this.context.lineWidth = 0.8;
          this.context.beginPath();
          this.context.moveTo(a.pos.X, a.pos.Y);
          this.context.lineTo(b.pos.X, b.pos.Y);
          this.context.stroke();
          this.context.closePath();
        }
      }
    }
  }

  /**
   * Run the animation.
   */
  startAnimation () {
    this.resize();
    this.render();
  }
}
