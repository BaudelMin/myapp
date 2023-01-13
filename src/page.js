import { useState } from "react";

const Counter = () => {
    const [counter, setCounter] = useState(0)
    return (
        <div>
        <p>Button is {counter} times.</p>
        <button className="bg-lime-300 px-2" onClick={() => setCounter(counter + 1)}>Click me</button>
        </div>
    )
}

export default Counter;