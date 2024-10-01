import {
  Route,
  Routes,
  BrowserRouter as Router,
} from 'react-router-dom';
import Login from "./components/pages/Login";
import ShoppingCart from "./components/pages/ShoppingCart";
import ProfilePage from "./components/pages/ProfilePage";
import MealMap from "./components/pages/MealMap";
import Home from "./components/pages/Home";
import { ThemeProvider } from "./context/ThemeContext";
import { SafeArea } from "antd-mobile";
import Navbar from "./components/organisms/Navbar";
import BottomNavigation from "./components/organisms/BottomNavigation";
import NotFoundPage from "./components/pages/NotFoundPage";
import Quest from "./components/pages/Quest";
import FlavourFlowPage from './components/pages/FlavourFlowPage';
import FlavourFlowResultPage from './components/pages/FlavourFlowResultPage';
import OnboardingFlow from './components/organisms/Onboarding';
import { AppContextProvider } from './context/AppContext';


const App = () => {
  return (
    <>
    <AppContextProvider>
      <ThemeProvider>
        <SafeArea position="top" />
          <Router>
          <Navbar/>
            <Routes >
              <Route>
                <Route path='/' element={ <Login />} />
                <Route path='/home' element={<Home />} />
                <Route path='/home/quest' element={<Quest />} />
                <Route path='/meal-map' element={<MealMap />} />
                <Route path='/shopping-cart' element={<ShoppingCart />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/flavour-flow' element={<FlavourFlowPage />} />
                <Route path='/flavour-flow/results' element={<FlavourFlowResultPage />} />
                <Route path='/onboarding' element={<OnboardingFlow />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
              {/* <Route>
                <Route path='/login' element={<Login />} />
                </Route> */}
            </Routes>
            <BottomNavigation/>
          </Router>
          <SafeArea position="bottom" />
        </ThemeProvider>
      </AppContextProvider>
    </>
  );
};


export default App;

