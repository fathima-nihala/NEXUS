import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack'
import store from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Provider store={store}>
        <SnackbarProvider autoHideDuration={2000} preventDuplicate dense    >
          <App />
        </SnackbarProvider>
    </Provider>
  </StrictMode>,
)
