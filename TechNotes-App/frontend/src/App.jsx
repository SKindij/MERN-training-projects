// App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import NotesList from './features/notes/NotesList';
import UsersList from './features/users/UsersList';

import NewUserForm from './features/users/NewUserForm';
import EditUser from './features/users/EditUser';

import NewNote from './features/notes/NewNote';
import EditNote from './features/notes/EditNote';


function App() {
  
  return (
   <Routes>
      <Route path="/" element={<Layout />} >
	      {/* "привітальна сторінка" */}
        <Route index element={<Public />} />
          {/* "" */}
        <Route path="login" element={<Login />} />		

        <Route path="dash" element={<DashLayout />}>
		  {/* "DashHeader" */}
            <Route index element={<Welcome />} />
  
			<Route path="users">
              <Route index element={<UsersList />} />
			   <Route path=":id" element={<EditUser />} />
               <Route path="new" element={<NewUserForm />} />
            </Route>

			<Route path="notes">
              <Route index element={<NotesList />} />
			   <Route path=":id" element={<EditNote />} />
               <Route path="new" element={<NewNote />} />
            </Route>
			

			
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
