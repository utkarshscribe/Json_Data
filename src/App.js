import React from 'react';
import 'antd/dist/reset.css';
import SchemaBuilder from './SchemaBuilder';

function App() {
  return (
    <div style={{ padding: '24px' }} className="App">
      <h2>JSON Schema Builder</h2>
      <SchemaBuilder />
    </div>
  );
}

export default App;
