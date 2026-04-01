import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import 'primeflex/primeflex.css';

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// ✅ create once outside component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,           // your interceptor already handles retries
      refetchOnWindowFocus: true,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="431110376522-4lie1amhiphqs9sq5jk09qgukochvoiq.apps.googleusercontent.com">
      <BrowserRouter>
       <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
       </QueryClientProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);


reportWebVitals();
