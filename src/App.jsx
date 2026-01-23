import React from 'react'
import {Routes, Route, Navigate} from "react-router-dom"
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import NotificationPage from './pages/NotificationPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'

import OnboardingPage from './pages/OnboardingPage'
import { Toaster } from "react-hot-toast"
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './config/axios.js'
import { useThemeStore } from './store/useThemeStore.js'

import useAuthUser from './hooks/useAuthUser.js'
import PageLoader from './components/PageLoader.jsx'
import Layout from './components/Layout.jsx'
import FriendsPage from './pages/FriendsPage.jsx'

const App = () => {

  const {isLoading, authUser} = useAuthUser()
  const  {theme} = useThemeStore();

  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded
 

  if ( isLoading) return <PageLoader />
  //axios
  //tanStack query
  return (
    <div className=' h-screen text-5xl' data-theme={theme}>


      <Toaster/>


     

      <Routes>
        <Route path='/' element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>

            <HomePage/>
          </Layout>
          
        ):(
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        )}/>

        <Route path='/signup' element={!isAuthenticated ? <SignUpPage/> : <Navigate to={isOnboarded ? "/": "/onboarding"}/>}/>

        <Route path='/login' element={!isAuthenticated ? <LoginPage/> : <Navigate to={isOnboarded ? "/": "/onboarding"}/>}/>

        <Route path='/notifications' element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <NotificationPage />
          </Layout>
        ):(
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        )}/>

        <Route path='/call/:id' element={
          isAuthenticated && isOnboarded ? ( <CallPage />) : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>)
        }/>
        
        <Route path='/chat/:id' element={isAuthenticated && isOnboarded ? 
          (<Layout showSidebar={false}>
          <ChatPage/>
        </Layout>): 
        (
          <Navigate to={!isAuthenticated? "/login": "/onboarding"}/>
        )}/>

        <Route path='/onboarding' element={ isAuthenticated? (
          !isOnboarded ? (<OnboardingPage/>):(<Navigate to="/"/>)
        ): (
          <Navigate to= "/login" />
        )}/>

        <Route path='/friends' element={isAuthenticated && isOnboarded ? 
        (<Layout showSidebar={true}>
          <FriendsPage/>
          </Layout>) :(
            <Navigate to={!isAuthenticated? "/login": "/onboarding"}/>
          )} />

        


      </Routes>
    </div>
  )
}

export default App