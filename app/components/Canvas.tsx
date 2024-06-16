"use client"
import { useState } from "react"
import { useDraw } from "../hooks/useDraw"
import { GithubPicker } from "react-color"
import ThemeSwitch from "./ThemeSwitch"

export const Canvas = () => {
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine)
  const [color, setColor] = useState<string>("#000")
  const [eraserOn, setEraserOn] = useState(false)

  function drawLine({ ctx, prevPoint, currentPoint }: Draw) {
    const { x: currX, y: currY } = currentPoint
    const lineColor = eraserOn ? "#FFF" : color
    const lineWidth = eraserOn ? 20 : 5

    let startPoint = prevPoint ?? currentPoint
    ctx!.beginPath()
    ctx!.lineWidth = lineWidth
    ctx!.strokeStyle = lineColor
    ctx!.moveTo(startPoint.x, startPoint.y)
    ctx!.lineTo(currX, currY)
    ctx!.stroke()

    ctx!.fillStyle = lineColor
    ctx!.beginPath()
    ctx!.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
    ctx!.fill()
  }

  return (
    <div>
      <div className="flex justify-center ">
        <div className="mr-4 ml-4">
          <GithubPicker color={color} onChange={(e: any) => setColor(e.hex)} />
        </div>

        <div className="mr-4 ml-4 mt-4">
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={clear}
          >
            Clear
          </button>
        </div>

        <div className="mr-4 ml-4 mt-4">
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => {
              setEraserOn(true)
            }}
          >
            {eraserOn ? "Draw" : "Erase"}
          </button>
        </div>
        <div className="pt-5">
          <ThemeSwitch />
        </div>
      </div>

      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          className=" border border black"
          width={700}
          height={700}
          onMouseDown={onMouseDown}
        ></canvas>
      </div>
    </div>
  )
}
