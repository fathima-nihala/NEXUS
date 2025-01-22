import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './shared/Header';
import { Suspense, lazy } from 'react';
import Footer from './shared/Footer';

const Login = lazy(() => import('./components/Login'));
const Signup =  lazy(() => import('./components/SignUp'));
const Home =  lazy(() => import('./components/Home'));


function App() {

  return (
    <Router>
       <Header />
       <Suspense fallback={<></>}>
       <Routes>
       <Route path='/' element={<Login />} />
       <Route path='/sign_up' element={<Signup/>} />
       <Route path='/home' element={<Home/>} />
       </Routes>
       </Suspense>
       <Footer/>
    </Router>
  )
}

export default App
