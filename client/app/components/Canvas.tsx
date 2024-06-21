"use client"
import { useEffect, useState } from "react"
import { useDraw } from "../hooks/useDraw"
import { GithubPicker } from "react-color"
import { io } from "socket.io-client"
import { drawLine } from "@/utils/drawLine"
import { Config } from "@/config"
import { useRouter } from 'next/navigation'
import  Icon  from './ui/icons/mainIcon'
import { GithubIcon } from './ui/icons/github'
import { InstaIcon } from './ui/icons/instaIcon'
import  LinkedInIcon from './ui/icons/linkedInIcon'
const socket =io(Config.URL)

export const Canvas = () => {
  const router = useRouter()
  const { canvasRef, onMouseDown, clear } = useDraw(createLine)
  const [color, setColor] = useState<string>("#000")
  const [eraserOn, setEraserOn] = useState(false)

  type DrawLineProps = {
    prevPoint: Point | null
    currentPoint: Point
    color: string
    size: number
  }


  function createLine({ prevPoint, currentPoint, ctx }: Draw) {
    const drawColor = eraserOn ? 'white' : color;
    const lineSize = eraserOn ? 10 : 5;
    socket.emit('draw-line', { prevPoint, currentPoint, color:drawColor, size:lineSize })
    drawLine({ prevPoint, currentPoint, ctx, color:drawColor,size:lineSize })
  }

  useEffect(()=>{
    const ctx= canvasRef.current?.getContext('2d')

    socket.emit('client-ready')

    socket.on('get-canvas-state', () => {
      if (!canvasRef.current?.toDataURL()) return
      console.log('sending canvas state')
      socket.emit('canvas-state', canvasRef.current.toDataURL())
    })

    socket.on('canvas-state-from-server', (state: string) => {
      console.log('I received the state')
      const img = new Image()
      img.src = state
      img.onload = () => {
        ctx?.drawImage(img, 0, 0)
      }
    })

    socket.on('draw-line', ({ prevPoint, currentPoint, color}: DrawLineProps) => {
      if (!ctx) return console.log('no ctx here')
      const drawColor = eraserOn ? 'white' : color;
      const lineSize = eraserOn ? 30 : 5;
      drawLine({ prevPoint, currentPoint, ctx, color:drawColor,size:lineSize })
    })

    socket.on('clear', clear)

    return () => {
      socket.off('draw-line')
      socket.off('get-canvas-state')
      socket.off('canvas-state-from-server')
      socket.off('clear')
    }
  },[canvasRef])

  return (
    <div>
      <div className="flex justify-between bg-slate-950">

          <div className="flex justify-center text-slate-100">
            <div className="mx-2 my-auto">
              <Icon></Icon>
            </div>
            <div className="mx-2 my-auto">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-red-500 from-orange-300">DRAW</span> IT</h1>
            </div>
          </div>

          <div className="flex justify-center ">
            <div className="mr-4 ml-4 my-2">
              <GithubPicker color={color} onChange={(e: any) => setColor(e.hex)} />
            </div>
         
            <div className="mr-4 ml-4 my-auto ">
              <button
                className="flex justify-center px-8 py-4 text-lg font-bold hover:text-white bg-slate-100 text-slate-950 hover:bg-orange-400 font-pj rounded-xl"
                onClick={()=>{socket.emit('clear')}}
              >
                Clear
              </button>
            </div>
      
            <div className="mr-4 ml-4 my-auto">
              <button
                className="flex justify-center px-8 py-4 text-lg font-bold hover:text-white bg-slate-100 text-slate-950 hover:bg-orange-400 font-pj rounded-xl"
                onClick={() => setEraserOn(!eraserOn)}
              >
                {eraserOn ? "Draw" : "Erase"}
              </button>
            </div>
          </div>
          <div className='flex justify-between mr-2 p-2 my-auto p-2'>
            <div className='mr-4'>
                <button onClick={()=>{ router.push('https://github.com/akshat99812') }}>
                    <GithubIcon></GithubIcon>
                </button>
                
            </div>
            <div className=''>
                <button onClick={()=>{ router.push('https://www.linkedin.com/in/akshat-patel-50211b28a/') }}>
                    <InstaIcon></InstaIcon>
                </button>
                
            </div>
            <div className='ml-4'>
                <button onClick={()=>{ router.push('https://www.instagram.com/akshat_patel9977/') }}>
                    <LinkedInIcon></LinkedInIcon>
                </button>
            </div>
        </div>
      
      </div>
      <hr className=""></hr>
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          height={800}
          width={1500}
          
        ></canvas>
      </div>
    </div>
  )
}
