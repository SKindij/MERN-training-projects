// App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';

import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';

function App() {
  
  return (
   <Routes>
      <Route path="/" element={<Layout />} >
	      {/* "привітальна сторінка" */}
        <Route index element={<Public />} />

        <Route path="login" element={<Login />} />		

        <Route path="dash" element={<DashLayout />}>
		    {/* "DashHeader" */}
          <Route index element={<Welcome />} />
            {/* "DashFooter" */}
		  
        </Route>{/* End "dash" */}

      </Route>{/* End "/" */}
    </Routes>
  )
}

export default App

/*
http://localhost:5173/
http://localhost:5173/dash
http://localhost:5173/login


*/
