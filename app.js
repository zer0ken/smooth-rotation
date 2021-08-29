import { Polygon } from './polygon.js'

class App {
    constructor() {
        this.canvas = document.createElement('canvas')
        document.body.appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d')

        this.pixelRatio = document.devicePixelRatio > 1 ? 2 : 1

        window.addEventListener('resize', this.resize.bind(this), false)
        this.resize()

        const touchEnabled = window.Touch || false
        console.log(touchEnabled)
        document.addEventListener('pointerdown', this.onDown.bind(this), false)
        document.addEventListener('pointermove', this.onMove.bind(this), false)
        document.addEventListener('pointerup', this.onUp.bind(this), false)
        document.addEventListener('touchend', this.onUp.bind(this), false)

        window.requestAnimationFrame(this.animate.bind(this))

        this.isDown = false
        this.moveX = 0
    }

    resize() {
        this.stageWidth = document.body.clientWidth
        this.stageHeight = document.body.clientHeight

        this.canvas.width = this.stageWidth * this.pixelRatio
        this.canvas.height = this.stageHeight * this.pixelRatio
        this.ctx.scale(this.pixelRatio, this.pixelRatio)

        this.polygon = new Polygon(
            this.stageWidth / 2,
            this.stageHeight + (this.stageHeight / 4),
            this.stageHeight / 1.5,
            15
        )
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this))

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)

        if (!this.isDown) {
            this.moveX *= 0.92
        }
        this.polygon.animate(this.ctx, this.moveX)
    }

    onDown(e) {
        this.isDown = true
        this.moveX = 0
        this.offsetX = e.clientX
    }

    onMove(e) {
        if (this.isDown) {
            this.moveX = this.offsetX - e.clientX
            this.offsetX = e.clientX
        }
    }

    onUp(e) {
        console.log('up')
        this.isDown = false
    }
}

window.onload = () => {
    new App()
}