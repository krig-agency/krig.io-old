import DeviceDetector from './DeviceDetector';

export default function Background (canvas) {
  const pointSpeed = 50;
  const totalPointCount = DeviceDetector.isMobile() ? 17 : 50;

  const context = canvas.getContext('2d');

  let width = document.body.clientWidth;
  let height = document.body.clientHeight;
  let devicePixelRatio = window.devicePixelRatio;
  canvas.width = width * devicePixelRatio;
  canvas.height = height * devicePixelRatio;

  const pointColor = '#e6e6e6';
  const pointRadius = 2;
  const lineColor = '#969696';

  context.lineWidth = 0.8;

  const maxDistance = 260;
  const maxDistance2 = maxDistance * maxDistance;
  const startOffset = 0;
  const resetDistance = 50;

  const points = [];
  for (let i = 0; i < totalPointCount; i++) {
    points.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vX: Math.random(),
      vY: Math.random(),
      phase: Math.random() * 10
    });
  }

  let lastFrame = performance.now();

  const mousePoint = {
    x: 0,
    y: 0,
    vX: 0,
    vY: 0,
    phase: Math.random() * 10
  };

  if (DeviceDetector.isMobile() === false) {
    document.addEventListener('mouseenter', () => {
      points.push(mousePoint);
    });
    document.addEventListener('mouseleave', () => {
      mousePoint.x = 0;
      mousePoint.y = 0;

      points.pop();
    });
    document.addEventListener('mousemove', (event) => {
      mousePoint.x = event.clientX;
      mousePoint.y = event.clientY;
    });
  }

  window.addEventListener('resize', onResize);

  function resetPoint (point) {
    const edge = Math.ceil(Math.random() * 4) - 1;
    if (edge === 0) {
      point.x = Math.random() * width;
      point.y = -startOffset;
      point.vX = Math.random();
      point.vY = Math.random();
    } else if (edge === 1) {
      point.x = width + startOffset;
      point.y = Math.random() * height;
      point.vX = -Math.random();
      point.vY = Math.random();
    } else if (edge === 2) {
      point.x = Math.random() * width;
      point.y = height + startOffset;
      point.vX = Math.random();
      point.vY = -Math.random();
    } else {
      point.x = -startOffset;
      point.y = Math.random() * height;
      point.vX = Math.random();
      point.vY = Math.random();
    }

    point.phase = Math.random() * 10;
  }

  function isOutsideBounds (p, pad = 0) {
    return p.x < -pad || p.x > width + pad || p.y < -pad || p.y > height + pad;
  }

  function onResize () {
    width = document.body.clientWidth;
    height = document.body.clientHeight;
    devicePixelRatio = window.devicePixelRatio;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
  }

  function onAnimationFrame (now) {
    const dT = now - lastFrame;

    const numberOfPoints = points.length;

    // Update points

    for (let i = 0; i < numberOfPoints; i++) {
      const point = points[i];

      point.x += point.vX / pointSpeed * dT;
      point.y += point.vY / pointSpeed * dT;

      if (isOutsideBounds(point, resetDistance)) {
        resetPoint(point);
      }

      point.phase += 0.003;
    }

    // Clear

    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw points

    const r = pointRadius * devicePixelRatio;

    context.fillStyle = pointColor;

    for (let i = 0; i < numberOfPoints; i++) {
      const point = points[i];

      const x = point.x * devicePixelRatio;
      const y = point.y * devicePixelRatio;
      const alpha = Math.abs(Math.cos(point.phase));

      context.globalAlpha = alpha;
      context.beginPath();
      context.arc(x, y, r, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();
    }

    // Draw lines

    context.fillStyle = lineColor;

    for (let i = 0; i < numberOfPoints; i++) {
      for (let j = i + 1; j < numberOfPoints; j++) {
        const a = points[i];
        const b = points[j];

        const dX = a.x - b.x;
        const dY = a.y - b.y;

        if (dX < -maxDistance || dX > maxDistance || dY < -maxDistance || dY > maxDistance) {
          continue;
        }

        const distance2 = dX * dX + dY * dY;

        if (distance2 > maxDistance2) {
          continue;
        }

        const distance = Math.sqrt(distance2);
        const fraction = distance / maxDistance;

        const aX = a.x * devicePixelRatio;
        const aY = a.y * devicePixelRatio;
        const bX = b.x * devicePixelRatio;
        const bY = b.y * devicePixelRatio;
        const alpha = (1.0 - fraction);

        context.globalAlpha = alpha;
        context.beginPath();
        context.moveTo(aX, aY);
        context.lineTo(bX, bY);
        context.stroke();
        context.closePath();
      }
    }

    // Next frame

    lastFrame = now;

    requestAnimationFrame(onAnimationFrame);
  }

  /**
   * Run the animation.
   */
  function startAnimation () {
    requestAnimationFrame(onAnimationFrame);
  }

  this.startAnimation = startAnimation;
}
