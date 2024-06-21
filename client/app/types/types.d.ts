type Draw = {
    ctx: CanvasRenderingContext2D
    currentPoint: Point
    prevPoint: Point | null
    color?: string
  }
  
  type Point = { x: number; y: number }