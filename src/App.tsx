import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import LoginPage from './pages/Login.page';
import SignupPage from './pages/Signup.page';
import ForgetPasswordPage from './pages/ForgetPassword.page';
import SideBar from './components/Sidebar';
import ProfileDetails from './pages/ProfileDetails';
import EditProfile from './pages/EditProfile';
import Chatbot2 from './ChatBot2';
import ChangePasswordPage from './pages/ChangePassword.page';
import EmailVerificationSuccess from './pages/EmailVerification.page';
import { AuthenticateRouteWrapper } from './routes/AuthenticateRouteWrapper';
import { useAppSelector } from './redux/store/store';
import { UnAuthenticateRouteWrapper } from './routes/UnAuthenticateRouteWrapper';
import ResetPasswordPage from './pages/ResetPassword.page';
function App() {
  const { token } = useAppSelector(state => state.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UnAuthenticateRouteWrapper />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgetPasswordPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={!token ? <Navigate to="/login" replace /> : <Navigate to="/home" replace />} />
          <Route path='/email-verification/:uid/:token' element={<EmailVerificationSuccess />} />
          <Route path='/reset-password/:uid/:token' element={<ResetPasswordPage />} />
        </Route>
        <Route element={<AuthenticateRouteWrapper />}>
          <Route path="/home" element={<Chatbot2 />} />
          <Route path="/sidebar" element={<SideBar />} >
            <Route path="/sidebar" element={<ProfileDetails />} />
            <Route path='update-profile' element={<EditProfile />} />
            <Route path='change-password' element={<ChangePasswordPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
