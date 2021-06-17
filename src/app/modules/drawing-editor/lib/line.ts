import { Coords } from '../components/drawing-editor/drawing-editor.component';

export class Line {
  color: string;
  points: Coords[] = [];

  constructor(coords: Coords, color: string) {
    this.color = color;
    this.points = [coords];
  }

  addPoint(coords: Coords): void {
    this.points.push(coords);
  }

  render(context: CanvasRenderingContext2D): void {
    if (this.points.length > 1) {
      context.beginPath();

      this.points.forEach((point, index) => {
        if (index === 0) {
          context.moveTo(point.x, point.y);
        } else {
          context.lineTo(point.x, point.y);
        }
      });

      context.strokeStyle = this.color;
      context.stroke();
    }
  }
}
