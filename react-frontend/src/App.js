import './App.css';

function App() {
    const loginTitle = "Welcome to the Main app";
    const likes = 50;
    // const person = {name: "yoshi", age: 30};

  return (
    <div className="App">
        <div className="content">
            <h1 className="content">{loginTitle}</h1>
            <p>{likes}</p>
        </div>
    </div>
  );
}

export default App;
