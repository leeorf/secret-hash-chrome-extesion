import React from 'react';
import ReactDOM from 'react-dom/client';
import './popup.css';

const rootContainer = document.createElement('div');
rootContainer.id = 'root';
document.body.appendChild(rootContainer);

const root = ReactDOM.createRoot(rootContainer);
root.render(<h1>Pop up page</h1>);
