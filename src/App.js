import './App.css';
import SideBar from './components/Sidebar'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SideBar />
      </header>
      <main>
        <div className="mainWr">
          <div className="main" />
        </div>
      </main>
    </div>
  );
}

export default App;
