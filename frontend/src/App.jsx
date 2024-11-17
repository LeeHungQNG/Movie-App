import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/home/HomePage';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authUser';
import { Loader } from 'lucide-react';
import WatchPage from './pages/WatchPage';
import SearchPage from './pages/SearchPage';
import SearchHistoryPage from './pages/SearchHistoryPage';
import NotFoundPage from './pages/404';

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();
  

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex items-center justify-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={'/'} />} />
        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to={'/'} />} />

        <Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to={'/login'} />} />
        <Route path="/search" element={user ? <SearchPage /> : <Navigate to={'/login'} />} />
        <Route path="/history" element={user ? <SearchHistoryPage /> : <Navigate to={'/login'} />} />

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      {/* Outsite routes it means can see footer every page */}
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
