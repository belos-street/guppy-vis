import React from 'react'
import { createRoot } from 'react-dom/client'
import { Renderer } from './page/renderer'

import './style.css'
import 'virtual:uno.css'

const container = document.getElementById('app')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <div className="flex font-black text-2xl">
      <Renderer />
    </div>
  </React.StrictMode>
)
