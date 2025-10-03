import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

/**
 * The main application component.
 * It renders the Vite and React logos, a counter button, and some informational text.
 *
 * This component uses the `useState` hook to manage a `count` state variable,
 * which is displayed and can be incremented by the user.
 *
 * @returns {JSX.Element} A JSX fragment containing the main application layout. The returned element includes:
 * - A `div` with links to Vite and React documentation, each with a logo.
 * - An `h1` element with the text "Vite + React".
 * - A `div` with a "card" class containing a `button` to increment the count and a `p` tag with instructions.
 * - A final `p` tag with the class "read-the-docs".
 */
function App() {
  // The `useState` hook initializes a state variable `count` to 0.
  // `setCount` is the function used to update the `count` state.
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
