import { NAV_ITEM_KEYS } from "@/constants";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const validToDraw = useRef<Boolean>(false);

  const activeNavItem: NAV_ITEM_KEYS = useSelector(
    (state: any) => state.nav.activeNavItem
  );
  const { color, size } = useSelector(
    (state: any) => state.toolbox[activeNavItem]
  );

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const changeStyle = () => {
      if (!context) return;
      context.strokeStyle = color;
      context.lineWidth = size;
    };
    changeStyle();
  }, [color, size]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (context) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const beginPath = (x:number, y:number) => {
      if (!context) return;
      context.beginPath();
      context.moveTo(x, y);
    }

    const handleMouseDown = (e: MouseEvent) => {
      validToDraw.current = true;
      beginPath(e.clientX, e.clientY);
    };

    const drawLines = (x:number, y:number) => {
      if (!context) return;
      context.lineTo(x, y);
      context.stroke();
    }
    const handleMouseMove = (e: MouseEvent) => {
      if(!validToDraw.current) return;
      drawLines(e.clientX, e.clientY);
    };

    const handleMouseUp = (e: MouseEvent) => {
      validToDraw.current = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  // console.log(color, size);
  return <canvas ref={canvasRef} />;
};

export default Canvas;
