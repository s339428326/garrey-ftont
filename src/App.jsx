import { Routes, Route, Navigate } from 'react-router-dom';
//nested Router
import UserInfo from './components/UserInfo';
import UserOrder from './components/UserOrder';
import UserArtwork from './components/UserArtwork';

import {
  HomePage,
  ArtworkPage,
  LoginPage,
  RegisterPage,
  ForgetPasswordPage,
  UserPage,
  UserImagePage,
  ArtworkIntroPage,
  PaymentPage,
} from './pages/index';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="forgetPassword" element={<ForgetPasswordPage />} />
      <Route path="artwork" element={<ArtworkPage />} />
      <Route path="artwork/:id" element={<ArtworkIntroPage />} />
      <Route path="user/:userId" element={<UserImagePage />} />
      <Route path="payment" element={<PaymentPage />} />
      <Route path="user" element={<UserPage />}>
        <Route index element={<Navigate to="info/:userId" />} />
        <Route path="info/:userId" element={<UserInfo />} />
        <Route path="order/:userId" element={<UserOrder />} />
        <Route path="artwork/:userId" element={<UserArtwork />} />
      </Route>
    </Routes>
  );
}

export default App;
