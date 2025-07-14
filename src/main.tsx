import React from 'react'
import { createRoot } from 'react-dom/client'
import { Renderer } from './demo/renderer'

import 'virtual:uno.css'

const container = document.getElementById('app')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <div className="flex flex-col items-center">
      <Renderer />
    </div>
  </React.StrictMode>
)
