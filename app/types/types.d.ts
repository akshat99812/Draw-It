type Draw = {
    ctx:CanvasRenderingContext2D | null | undefined
    currentPoint: Point
    prevPoint: Point | null
  }
  
  type Point = { x: number; y: number }