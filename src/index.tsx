import { Context, createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

interface MockerContextValue {
  mock: boolean
}

const MockerContext: Context<MockerContextValue> = createContext<MockerContextValue>({ mock: false })
const MockerProvider = MockerContext.Provider
export const useMockerContext = () => useContext(MockerContext)

root.render(
  <MockerProvider value={{ mock: false }}>
    <App />
  </MockerProvider>
);
/* root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
