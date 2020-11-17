import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './container/Routes';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<Router />, document.getElementById('root'));

serviceWorker.unregister();
