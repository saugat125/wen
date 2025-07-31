import './index.css'
import useInactivity from './useInactivity'

function App() {
  useInactivity(5000);

  return ( 
    <div>
        <h1>User Inactivity</h1>
    </div>
  )
}

export default App
