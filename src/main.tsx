import { App } from '@/app'
import { createRoot } from 'react-dom/client'

import './styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

const root = createRoot(document.getElementById('root')!)

root.render(<App />)
