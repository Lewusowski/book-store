import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ClientStore from './store/ClientStore';
import BookStore from './store/BookStore';

export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Context.Provider value={{
          client: new ClientStore(),
          book: new BookStore()
      }}>
        <App />
      </Context.Provider>
  </React.StrictMode>
);

reportWebVitals();
