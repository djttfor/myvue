import React from 'react'
import ReactDom from 'react-dom'
import './body.css'
import StoreDemo from './store/storeDemo';
import 'antd/dist/antd.css';
import ScrollTest from './page/ScrollTest';
import ReactReduxTest from './store/reactReduxTest';
import { Count } from './container/Count';
import store from './store';
import { Provider } from 'react-redux';
import AxiosTest from './components/axiosTest';



const view = (
    <div>
         <AxiosTest/>
    </div>
)

ReactDom.render(view, document.getElementById('root'))
