import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { SingletonHooksContainer } from 'react-singleton-hook'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SingletonHooksContainer />    
    <App />
  </React.StrictMode>,
)
