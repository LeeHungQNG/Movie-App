import HomeScreen from './HomeScreen.jsx';
import AuthScreen from './AuthScreen.jsx';
import { useAuthStore } from '../../store/authUser.jsx';

const HomePage = () => {
  const { user } = useAuthStore();

  return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};

export default HomePage;
