import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [image, setImage] = useState(null); // For the warehouse map image
  const [points, setPoints] = useState([]); // List of points on the map
  const [state, setState] = useState('duringInit'); // Application state

  useEffect(() => {
    // Generate random points for the warehouse layout
    const generatedPoints = Array.from({ length: 10 }, () => ({
      x: Math.random() * 600, // Random x within 600px width
      y: Math.random() * 400, // Random y within 400px height
      color: 'blue',
    }));
    setPoints(generatedPoints);
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setState('waitForOrder'); // Transition to waitForOrder state
    }
  };

  const handlePointClick = (index) => {
    const updatedPoints = points.map((point, i) =>
      i === index ? { ...point, color: 'red' } : point
    );
    setPoints(updatedPoints);

    // Check if all points are red
    if (updatedPoints.every((point) => point.color === 'red')) {
      setState('finalizeOrder'); // Transition to finalizeOrder state
    }
  };

  const finalizeOrder = () => {
    if (window.confirm('Are you sure everything is taken?')) {
      alert('Order finalized!');
      setState('waitForOrder'); // Reset to initial state
      setPoints([]);
      // Generate random points for the warehouse layout
      const generatedPoints = Array.from({ length: 10 }, () => ({
        x: Math.random() * 600, // Random x within 600px width
        y: Math.random() * 400, // Random y within 400px height
        color: 'blue',
      }));
      setPoints(generatedPoints);
    }
  };

  return (
    <div className="app">
      <h1>Warehouse Map</h1>

      {state === 'duringInit' && (
        <div>
          <h2>Upload Warehouse Map</h2>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
      )}

      {image && (
        <div>
          <h2>Map</h2>
          <div
            className="map"
            style={{ backgroundImage: `url(${image})` }}
          >
            {points.map((point, index) => (
              <div
                key={index}
                className="point"
                style={{
                  left: point.x,
                  top: point.y,
                }}
                onClick={() => handlePointClick(index)}
              >
                <div className="x-shape" style={{ backgroundColor: point.color }}></div>
              </div>
            ))}
          </div>

          {state === 'finalizeOrder' && (
            <button onClick={finalizeOrder}>Finalize Order</button>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
