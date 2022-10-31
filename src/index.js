import ReactDOM from 'react-dom/client';
import React from 'react';
import './sass/stylesheet';
import App from './App';
import Provider from './store/globalstore';
import Startup from './components/Startup';
import APProvider from './apollo/apollo';
import Loader from './components/layout/loading';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <APProvider>
        <Provider>
            <Startup>
                <Loader />
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Startup>
        </Provider>
    </APProvider>
)