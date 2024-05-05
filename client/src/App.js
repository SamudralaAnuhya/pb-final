
import axios from "axios";

function App() {
  const apiCall = () => {
    axios.get('http://localhost:3000').then((response) => {
      console.log(response.data);
    })
  }
  return (
    <div className="App">
      <header className="App-header">

<button onClick={apiCall}>Make express call</button>
      </header>
    </div>
  );
}

export default App;
