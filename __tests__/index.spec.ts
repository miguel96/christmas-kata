import { describe, it, expect } from 'bun:test'

class Light {
    isOn: boolean
    positionX: number
    private positionY: number

    constructor(positionX: number, positionY: number = 0) {
        this.positionX = positionX
        this.positionY = positionY
        this.isOn = false
    }

    turnOn() {
        this.isOn = true
    }

    turnOff() {
        this.isOn = false
    }

    isInPosition(
        desdeX: number,
        hastaX: number,
        desdeY: number,
        hastaY: number
    ) {
        return (
            this.positionX >= desdeX &&
            this.positionX <= hastaX &&
            this.positionY >= desdeY &&
            this.positionY <= hastaY
        )
    }
}

class ChristmasLights {
    private size: any
    private luces: Light[]

    constructor(size: number) {
        this.size = size
        this.luces = []
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                this.luces.push(new Light(i, j))
            }
        }
    }

    toggle(desdeX: number, hastaX: number, desdeY: number, hastaY: number) {
        this.luces.forEach((light) => {
            if (light.isInPosition(desdeX, hastaX, desdeY, hastaY)) {
                light.isOn ? light.turnOff() : light.turnOn()
            }
        })
    }
    turnOn(desdeX: number, hastaX: number, desdeY: number, hastaY: number) {
        this.luces.forEach((light) => {
            if (light.isInPosition(desdeX, hastaX, desdeY, hastaY)) {
                light.turnOn()
            }
        })
    }
    getLightsOn() {
        return this.luces.filter((light) => light.isOn).length
    }

    turnOff(desdeX: number, hastaX: number, desdeY: number, hastaY: number) {
        this.luces.forEach((light) => {
            if (light.isInPosition(desdeX, hastaX, desdeY, hastaY)) {
                light.turnOff()
            }
        })
    }
}

describe('kata', () => {
    it('una cuadricula de una luz apagada', () => {
        const christmasLights = new ChristmasLights(1)
        const lucesEncendidas = christmasLights.getLightsOn()

        expect(lucesEncendidas).toBe(0)
    })

    it('una cuadricula de una luz que encendemos', () => {
        const christmasLights = new ChristmasLights(1)
        christmasLights.turnOn(0, 0, 0, 0)

        const lucesEncendidas = christmasLights.getLightsOn()
        expect(lucesEncendidas).toBe(1)
    })
    it('una cuadricula de una luz que encendemos y apagamos', () => {
        const christmasLights = new ChristmasLights(1)
        christmasLights.turnOn(0, 0, 0, 0)
        christmasLights.turnOff(0, 0, 0, 0)

        const lucesEncendidas = christmasLights.getLightsOn()
        expect(lucesEncendidas).toBe(0)
    })

    it('encender dos luces', () => {
        const christmasLights = new ChristmasLights(2)
        christmasLights.turnOn(0, 1, 0, 0)

        const lucesEncendidas = christmasLights.getLightsOn()
        expect(lucesEncendidas).toBe(2)
    })
    it('una cuadricula de una luz que encendemos y apagamos', () => {
        const christmasLights = new ChristmasLights(2)
        christmasLights.turnOn(0, 0, 0, 0)
        const lucesEncendidas = christmasLights.getLightsOn()
        expect(lucesEncendidas).toBe(1)
    })
    it('encender dos luces por separado', () => {
        const christmasLights = new ChristmasLights(2)
        christmasLights.turnOn(0, 0, 0, 0)
        christmasLights.turnOn(1, 1, 0, 0)

        const lucesEncendidas = christmasLights.getLightsOn()
        expect(lucesEncendidas).toBe(2)
    })
    it('Apagar una luz', () => {
        const christmasLights = new ChristmasLights(1)
        christmasLights.turnOn(0, 0, 0, 0)
        christmasLights.turnOff(1, 1, 0, 0)

        const lucesEncendidas = christmasLights.getLightsOn()
        expect(lucesEncendidas).toBe(1)
    })

    it('toggle de tres luces, una apagada y dos encendidas', () => {
        const christmasLights = new ChristmasLights(3)
        christmasLights.turnOn(0, 0, 0, 0)
        christmasLights.toggle(0, 2, 0, 0)

        const lucesEncendidas = christmasLights.getLightsOn()
        expect(lucesEncendidas).toBe(2)
    })
    it('Encender luz en 2 fila', () => {
        const christmasLights = new ChristmasLights(2)
        christmasLights.turnOn(0, 0, 0, 0)
        christmasLights.turnOn(0, 0, 1, 1)

        const lucesEncendidas = christmasLights.getLightsOn()
        expect(lucesEncendidas).toBe(2)
    })

    it('acceptance test', () => {
        const christmasLights = new ChristmasLights(4)
        christmasLights.turnOn(0, 2, 0, 2)
        expect(christmasLights.getLightsOn()).toBe(9)

        christmasLights.turnOff(1, 2, 1, 2)
        expect(christmasLights.getLightsOn()).toBe(5)

        christmasLights.toggle(0, 3, 0, 3)
        expect(christmasLights.getLightsOn()).toBe(11)
    })
})
