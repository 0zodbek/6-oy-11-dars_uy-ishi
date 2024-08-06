import { useState, useEffect } from 'react'
import LineChartComponent from './components/LineChartComponent';
import './App.css'

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(jsonData => {
        const formattedData = jsonData.map(item => ({
          date: new Date(item.time).toLocaleDateString(),
          value: item.value
        }));
        setData(formattedData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div className='loader'> Loading... </div>;
  if (error) return <div> Error: {error}</div>;

  return (
    <div className="App">
      <h1>RUB/USD</h1>
      <LineChartComponent data={data} />
    </div>
  )
}

export default App