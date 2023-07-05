// import './App.css';
import HighchartsComponent from './components/ParliamentGraph';

function App() {
  const data = [
    { name: 'Progressive Party', color: 'blue', seats: 18 },
    { name: 'Liberty Alliance', color: 'red', seats: 36 },
    { name: 'Green Future', color: 'green', seats: 24 },
    { name: 'Democratic Front', color: 'purple', seats: 25 },
    { name: 'Unity Party', color: 'orange', seats: 20 },
    { name: 'Conservative Coalition', color: 'black', seats: 15 },
    // Add more parties and their seats here if needed
  ];
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <HighchartsComponent data={data} />;
      </div>
    </>
  );
}

export default App;
