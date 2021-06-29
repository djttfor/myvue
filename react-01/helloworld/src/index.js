import React from 'react'
import ReactDom from 'react-dom'
import 'element-theme-default';
import './body.css'
import ITimer from './components/ITimer';
import App from './router/components/app';
import { BrowserRouter as Router} from 'react-router-dom'



const view =
    <div>
       <Router>
           <App/>
       </Router>
    </div>

ReactDom.render(view, document.getElementById('root'))
