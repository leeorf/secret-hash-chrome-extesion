import React from 'react';
import ReactDOM from 'react-dom/client';

const rootContainer = document.createElement('div');
rootContainer.id = 'root';
document.body.appendChild(rootContainer);

const root = ReactDOM.createRoot(rootContainer);
root.render(<h1>Options page!!!</h1>);
