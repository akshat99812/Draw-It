type DrawLineProps ={
    color: string
    ctx:CanvasRenderingContext2D
    currentPoint: Point
    prevPoint: Point | null
    size: number
  }
  
  export const drawLine = ({ prevPoint, currentPoint, ctx, color ,size}: DrawLineProps) => {
    const { x: currX, y: currY } = currentPoint
    const lineColor = color
    const lineWidth = size
  
    let startPoint = prevPoint ?? currentPoint
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.moveTo(startPoint.x, startPoint.y)
    ctx.lineTo(currX, currY)
    ctx.stroke()
  
    ctx.fillStyle = lineColor
    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
    ctx.fill()
  }
  