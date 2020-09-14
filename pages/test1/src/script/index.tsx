import React from 'react'
import { render } from 'react-dom'
import { SuperTest, ComponentB } from './module1'

class Test extends SuperTest {
    constructor() {
        super("test")
    }

    public test1() {
        this.test2()
    }

    private test2() {
        this.sayName()
    }
}

const test = new Test()
test.test1()


const TestComp = () => {

    return <div>
        this is a react component
        <ComponentB></ComponentB>
    </div>
}

render(<TestComp></TestComp>, document.getElementById('app'))


