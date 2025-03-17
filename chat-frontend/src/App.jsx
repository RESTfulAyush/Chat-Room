// App.js
import "./App.css";
import ChatRoom from "./ChatRoom";

function App() {
  return (
    <div className="App">
      {/* <header>
        <h1>React Chat App</h1>
      </header> */}
      <main>
        <ChatRoom />
      </main>
      {/* <footer>
        <p>&copy; {new Date().getFullYear()} Chat App</p>
      </footer> */}
    </div>
  );
}

export default App;