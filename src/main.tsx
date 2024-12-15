import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.tsx'
import './main.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons' // Solid icons
import { far } from '@fortawesome/free-regular-svg-icons' // Regular icons
import { fab } from '@fortawesome/free-brands-svg-icons' // Brand icons

// Add entire icon packs or specific icons
library.add(fas, far, fab)

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ToastContainer position="bottom-right" theme="colored" />
  </QueryClientProvider>
)
