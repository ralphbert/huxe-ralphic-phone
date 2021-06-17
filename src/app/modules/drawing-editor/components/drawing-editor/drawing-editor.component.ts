import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, ViewChild, ElementRef, HostListener, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Line } from '../../lib/line';

export type DrawEvent = MouseEvent | TouchEvent;

export interface Coords {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface DrawEventData {
  absolute: Coords;
  relative: Coords;
  canvas: Size;
}

@Component({
  selector: 'app-drawing-editor',
  templateUrl: './drawing-editor.component.html',
  styleUrls: ['./drawing-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawingEditorComponent implements OnInit {
  private canvas: ElementRef<HTMLCanvasElement>;
  private ready$ = new Subject<void>();
  private draw$ = new Subject<Coords>();
  @Output() drawingChange = new EventEmitter<string>();
  color = '#000000';

  lines: Line[] = [];
  currentLine: Line = null;

  @ViewChild('canvas') set canvasSetter(canvas: ElementRef<HTMLCanvasElement>) {
    this.canvas = canvas;
    this.ready$.next();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.initCanvas();
  }

  get context(): CanvasRenderingContext2D {
    return this.canvas?.nativeElement?.getContext('2d');
  }

  get canvasSize(): Size {
    return {
      width: this.canvas.nativeElement.width,
      height: this.canvas.nativeElement.height,
    };
  }

  constructor() { }

  ngOnInit(): void {
    this.ready$.subscribe(() => {
      console.log('REAADY>');
      this.initCanvas();
      this.emitDataUrl();
    });

    this.draw$.pipe(filter(() => !!this.currentLine)).subscribe(data => {
      console.log(data);
      this.currentLine.addPoint(data);
      this.render();
    });
  }

  initCanvas(): void {
    this.canvas.nativeElement.width = this.canvas.nativeElement.clientWidth;
    this.canvas.nativeElement.height = this.canvas.nativeElement.clientHeight;
    this.render();
  }

  startDrawing(event: DrawEvent): void {
    this.currentLine = new Line(this.getCoordsFromEvent(event), this.color);
    this.lines.push(this.currentLine);
    this.draw$.next(this.getCoordsFromEvent(event));
  }

  endDrawing(event: DrawEvent): void {
    this.draw$.next(this.getCoordsFromEvent(event));
    this.currentLine = null;
    this.emitDataUrl();
    console.log(this.lines);
  }

  draw(event: DrawEvent): void {
    this.draw$.next(this.getCoordsFromEvent(event));
  }

  private getCoordsFromEvent(event: DrawEvent): Coords {
    const eventCoords: Coords = {
      x: null,
      y: null,
    };

    if (event instanceof MouseEvent) {
      eventCoords.x = event.pageX;
      eventCoords.y = event.pageY;
    } else {
      const first = event.touches.item(0);
      eventCoords.x = first.pageX;
      eventCoords.y = first.pageY;
    }

    return eventCoords;
  }

  private render(): void {
    const size = this.canvasSize;
    this.context.clearRect(0, 0, size.width, size.height);

    this.lines.forEach(line => {
      line.render(this.context);
    });
  }

  clear(): void {
    this.lines = [];
    this.render();
    this.emitDataUrl();
  }

  emitDataUrl(): void {
    this.drawingChange.emit(this.canvas.nativeElement.toDataURL());
  }
}
