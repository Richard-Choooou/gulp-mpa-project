import React from 'react'

export class SuperTest {
    private name: string = ""
    constructor(name: string) {
        this.name = name
    }

    public sayName() {
        console.log(this.name)
    }
}

export const ComponentB = () => {
    return <div>
        this is component b
        <img src="./src/images/a1.png" />
    </div>
}