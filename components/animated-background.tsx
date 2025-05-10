"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function AnimatedBackground() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 opacity-80" />
            {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-gradient-to-br from-purple-300/20 to-indigo-300/20 backdrop-blur-3xl"
                    initial={{
                        x: Math.random() * 100 - 50 + "%",
                        y: Math.random() * 100 - 50 + "%",
                        scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                        x: [Math.random() * 100 - 50 + "%", Math.random() * 100 - 50 + "%"],
                        y: [Math.random() * 100 - 50 + "%", Math.random() * 100 - 50 + "%"],
                    }}
                    transition={{
                        duration: Math.random() * 20 + 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    style={{
                        width: Math.random() * 400 + 100,
                        height: Math.random() * 400 + 100,
                    }}
                />
            ))}

            <ParticleCanvas />
        </div>
    )
}

function ParticleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (typeof window === "undefined") return // ⛔ Prevent SSR crash

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let particles: Particle[] = []

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener("resize", resizeCanvas)
        resizeCanvas()

        class Particle {
            x: number
            y: number
            size: number
            speedX: number
            speedY: number
            color: string

            constructor(private canvas: HTMLCanvasElement, private ctx: CanvasRenderingContext2D) {
                this.x = Math.random() * this.canvas.width
                this.y = Math.random() * this.canvas.height
                this.size = Math.random() * 3 + 1
                this.speedX = Math.random() * 0.5 - 0.25
                this.speedY = Math.random() * 0.5 - 0.25
                this.color = `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(
                    Math.random() * 100 + 155,
                )}, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.3 + 0.1})`
            }

            update() {
                this.x += this.speedX
                this.y += this.speedY

                if (this.x > this.canvas.width) this.x = 0
                else if (this.x < 0) this.x = this.canvas.width

                if (this.y > this.canvas.height) this.y = 0
                else if (this.y < 0) this.y = this.canvas.height
            }

            draw() {
                this.ctx.fillStyle = this.color
                this.ctx.beginPath()
                this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                this.ctx.closePath()
                this.ctx.fill()
            }
        }

        const initParticles = () => {
            particles = []
            const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 100)

            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(canvas, ctx))
            }
        }

        initParticles()

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            for (const particle of particles) {
                particle.update()
                particle.draw()
            }
            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ pointerEvents: "none" }} />
}
