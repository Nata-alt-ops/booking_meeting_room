
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// ✅ ПРАВИЛЬНО: Без "../", просто имя пакета
import 'bootstrap/dist/css/bootstrap.min.css'; 

// ✅ Ваши стили (тут точка нужна, так как это ваша папка)
import './styles/main.scss';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

reportWebVitals();