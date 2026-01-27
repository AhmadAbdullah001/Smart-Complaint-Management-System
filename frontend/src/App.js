import React from 'react'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StudentHome from './components/HomePage/StudentHome'
import TeacherHome from './components/HomePage/TeacherHome'
import Functions from './components/API_Functions/Functions'
import RaiseComplaint from './components/StudentFeatures/RaiseNewComplaint'
import MyComplaints from './components/StudentFeatures/MyComplaints'
import MyNotifications from './components/StudentFeatures/MyNotifications'
import AuthPage from './components/GettingIN/Auth'
import ComplaintList from './components/HomePage/ComplaintList'

function App() {
  return (
    <Functions>  
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teacherhome" element={<TeacherHome />} />
          <Route path="/studenthome" element={<StudentHome />} />
          <Route path='/raisenewcomplaint' element={<RaiseComplaint/>}/>
          <Route path='/mycomplaints' element={<MyComplaints/>}/>
          <Route path='/mynotifications' element={<MyNotifications/>}/>
          <Route path='/auth' element={<AuthPage/>}/>
          <Route path='/complaintlist' element={<ComplaintList/>}/>
        </Routes>
      </Router>
    </Functions>
  )
}

export default App
