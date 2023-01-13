import { useRef, useState } from 'react';

export default function Counter() {
  let ref = useRef(0);
  const [count, setCount] = useState(0)

  function handleClick() {
    ref.current = ref.current + 1;
    // alert('You clicked ' + ref.current + ' times!');
    setCount(ref.current)
  }

  return (
    <div>
    <button onClick={handleClick}>
      Click me!
    </button>
    <p>You have clicked {count}</p>
    </div>
  );
}