// import './App.css';
import ParliamentChartD3 from './components/ParliamentChartD3';

function App() {
  const data = [
    {
      party: 'Democratic Party',
      seats: 52,
      color: '#636cbb',
    },
    {
      party: 'Republican Party',
      seats: 39,
      color: '#26d050',
    },
    {
      party: 'Green Party',
      seats: 67,
      color: '#315cee',
    },
    {
      party: 'Socialist Party',
      seats: 26,
      color: '#ff0000',
    },
    {
      party: 'Libertarian Party',
      seats: 23,
      color: '#f8e71c',
    },
    {
      party: 'Progressive Party',
      seats: 19,
      color: '#8c2a9a',
    },
  ];
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <ParliamentChartD3 data={data} />
      </div>
    </>
  );
}

export default App;
