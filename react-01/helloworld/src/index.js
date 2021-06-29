import React from 'react'
import ReactDom from 'react-dom'
import 'element-theme-default';
import './body.css'
import MouseTest from './components/mouseTest';
import RouterTest from './router';




const view = 
<div>
    <RouterTest/>
</div>

ReactDom.render(view,document.getElementById('root'))
