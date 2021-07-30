import React from 'react'
import ReactDom from 'react-dom'
import { Count } from './container/Count';
import store from './store';
import { Provider } from 'react-redux';



const view = (
  <div>
      <Provider store={store}>
          <Count />
      </Provider>

  </div>
)

ReactDom.render(view, document.getElementById('root'))