import { COLORS, COLOR_KEYS, NAV_ITEMS } from "@/constants";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionItemClick } from "@/slice/navSlice";
import { socket } from "@/socket";

interface DRAW_STYLE {
  color: COLOR_KEYS;
  size: number;
}

const Canvas: React.FC = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const validToDraw = useRef<Boolean>(false);
  const storeHistory = useRef<ImageData[]>([]);
  const historyIndex = useRef<number>(0);

  const { activeNavItem, actionNavItem } = useSelector(
    (state: any) => state.nav
  );

  const { color, size } = useSelector(
    (state: any) => state.toolbox[activeNavItem]
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (actionNavItem === NAV_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "canvas-image.png";
      anchor.click();
    } else if (
      actionNavItem === NAV_ITEMS.UNDO ||
      actionNavItem === NAV_ITEMS.REDO
    ) {
      if (historyIndex.current > 0 && actionNavItem === NAV_ITEMS.UNDO)
        historyIndex.current-=1;
      if (
        historyIndex.current < storeHistory.current.length - 1 &&
        actionNavItem === NAV_ITEMS.REDO
      )
        historyIndex.current+=1;
      const imageData = storeHistory.current[historyIndex.current];
      if(context){
        context.putImageData(imageData, 0, 0);
      }
    } else if (actionNavItem === NAV_ITEMS.CLEAR) {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (canvas && context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = COLORS.WHITE;
        context.fillRect(0, 0, canvas.width, canvas.height);
        storeHistory.current = [];
        historyIndex.current = 0;
      }
    }
    dispatch(actionItemClick(null));
  }, [actionNavItem, dispatch]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (context) {
      context.fillStyle = COLORS.WHITE;
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const changeStyle = (color: COLOR_KEYS, size: number) => {
      if (!context) return;
      context.strokeStyle = color;
      context.lineWidth = size;
    };
    const handleChangeStyles = (styles : DRAW_STYLE) =>{
      changeStyle(styles.color, styles.size);
    }
    changeStyle(color,size);
    socket.on('changeStyles', handleChangeStyles);

    return () => {
      socket.off('changeStyles', handleChangeStyles);
    }

  }, [color, size]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (context) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const beginPath = (x: number, y: number) => {
      if (!context) return;
      context.beginPath();
      context.moveTo(x, y);
    };

    const traceLine = (x: number, y: number) => {
      if (!context) return;
      context.lineTo(x, y);
      context.stroke();
    };

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      validToDraw.current = true;
      const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
      beginPath(clientX, clientY);
      socket.emit('beginPath', {x: clientX, y: clientY});
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!validToDraw.current) return;
      const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
      traceLine(clientX, clientY);
      socket.emit('traceLine', {x: clientX, y: clientY});
    };

    const handleMouseUp = (e: MouseEvent | TouchEvent) => {
      validToDraw.current = false;
      const imageData = context?.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      if (!imageData) return;
      storeHistory.current.push(imageData);
      historyIndex.current = storeHistory.current.length - 1;
    };

    const handlePath = (data: MouseEvent) => {
      beginPath(data.x, data.y);
    }

    const handleDrawPath = (data: MouseEvent) => {
      traceLine(data.x, data.y);
    }

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener('touchstart', handleMouseDown);
    canvas.addEventListener('touchmove', handleMouseMove);
    canvas.addEventListener('touchend', handleMouseUp);

    socket.on("beginPath", handlePath);
    socket.on("traceLine", handleDrawPath);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener('touchstart', handleMouseDown);
      canvas.removeEventListener('touchmove', handleMouseMove);
      canvas.removeEventListener('touchend', handleMouseUp);
      socket.off('beginPath', handlePath);
      socket.off('drawPath', handleDrawPath);
    };
  }, []);
  return <canvas ref={canvasRef} />;
};

export default Canvas;
