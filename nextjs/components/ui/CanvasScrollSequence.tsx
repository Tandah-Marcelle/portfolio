"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface CanvasScrollSequenceProps {
    totalFrames?: number;
    framePrefix?: string;
    frameExtension?: string;
    className?: string;
    opacity?: number;
    isInline?: boolean;
    autoPlay?: boolean;
    fps?: number;
}

export default function CanvasScrollSequence({
    totalFrames = 130,
    framePrefix = "/assets/frames/ezgif-frame-",
    frameExtension = ".jpg",
    className = "",
    opacity = 1,
    isInline = false,
    autoPlay = true,
    fps = 30,
}: CanvasScrollSequenceProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef<number>(0);
    const animFrameIdRef = useRef<number | null>(null);
    const lastFrameTimeRef = useRef<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [loadProgress, setLoadProgress] = useState<number>(0);
    const [imagesReady, setImagesReady] = useState<boolean>(false);

    // Helper to format frame path (e.g., /assets/frames/ezgif-frame-001.jpg)
    const getFramePath = useCallback(
        (index: number) => {
            const frameNum = String(index + 1).padStart(3, "0");
            return `${framePrefix}${frameNum}${frameExtension}`;
        },
        [framePrefix, frameExtension]
    );

    // Preload all sequential image frames into memory
    useEffect(() => {
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        for (let i = 0; i < totalFrames; i++) {
            const img = new Image();
            img.src = getFramePath(i);

            img.onload = () => {
                loadedCount++;
                const progress = Math.round((loadedCount / totalFrames) * 100);
                setLoadProgress(progress);

                if (loadedCount === totalFrames) {
                    setIsLoading(false);
                    setImagesReady(true);
                }
            };

            img.onerror = () => {
                loadedCount++;
                const progress = Math.round((loadedCount / totalFrames) * 100);
                setLoadProgress(progress);

                if (loadedCount === totalFrames) {
                    setIsLoading(false);
                    setImagesReady(true);
                }
            };

            loadedImages.push(img);
        }

        imagesRef.current = loadedImages;

        return () => {
            imagesRef.current = [];
        };
    }, [totalFrames, getFramePath]);

    // Render a specific frame onto the canvas with cover ratio scaling
    const drawFrame = useCallback((frameIndex: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const images = imagesRef.current;
        const img = images[frameIndex];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        const dpr = window.devicePixelRatio || 1;
        const parent = containerRef.current || canvas.parentElement || document.body;
        const displayWidth = parent.clientWidth || window.innerWidth;
        const displayHeight = parent.clientHeight || window.innerHeight;

        if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
            canvas.width = displayWidth * dpr;
            canvas.height = displayHeight * dpr;
            canvas.style.width = `${displayWidth}px`;
            canvas.style.height = `${displayHeight}px`;
        }

        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, displayWidth, displayHeight);

        // Calculate cover dimensions
        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;
        const scale = Math.max(displayWidth / imgWidth, displayHeight / imgHeight);

        const scaledWidth = imgWidth * scale;
        const scaledHeight = imgHeight * scale;

        const offsetX = (displayWidth - scaledWidth) / 2;
        const offsetY = (displayHeight - scaledHeight) / 2;

        ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
        ctx.restore();
    }, []);

    // Frame animation loop (supports continuous autoPlay loop or scroll-bound)
    useEffect(() => {
        if (!imagesReady) return;

        const frameInterval = 1000 / fps;

        const renderLoop = (timestamp: number) => {
            if (autoPlay) {
                if (timestamp - lastFrameTimeRef.current >= frameInterval) {
                    lastFrameTimeRef.current = timestamp;
                    currentFrameRef.current = (currentFrameRef.current + 1) % totalFrames;
                    drawFrame(Math.floor(currentFrameRef.current));
                }
            } else {
                drawFrame(Math.floor(currentFrameRef.current));
            }

            animFrameIdRef.current = requestAnimationFrame(renderLoop);
        };

        animFrameIdRef.current = requestAnimationFrame(renderLoop);

        return () => {
            if (animFrameIdRef.current) {
                cancelAnimationFrame(animFrameIdRef.current);
            }
        };
    }, [imagesReady, totalFrames, drawFrame, autoPlay, fps]);

    // Handle container resize
    useEffect(() => {
        if (!imagesReady) return;

        const handleResize = () => {
            drawFrame(Math.floor(currentFrameRef.current));
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [imagesReady, drawFrame]);

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${isInline ? "w-full h-full min-h-[380px] md:min-h-[480px] rounded-3xl" : "fixed inset-0 z-0 pointer-events-none"
                } ${className}`}
        >
            {/* Sleek Preloader Overlay */}
            {isLoading && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#07090E] text-white p-6 rounded-3xl">
                    <div className="relative w-16 h-16 mb-4">
                        <div className="absolute inset-0 rounded-full border-2 border-[#00C853]/20 border-t-[#FF6B00] animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-[#FF6B00]">
                            {loadProgress}%
                        </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        Loading Motion Animation
                    </span>
                </div>
            )}

            {/* HTML5 Canvas Element */}
            <canvas
                ref={canvasRef}
                className="w-full h-full object-cover block transition-opacity duration-700 ease-in-out"
                style={{ opacity: imagesReady ? opacity : 0 }}
            />
        </div>
    );
}
