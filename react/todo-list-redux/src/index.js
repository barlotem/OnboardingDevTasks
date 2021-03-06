import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore();

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
