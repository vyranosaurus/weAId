import { Routes, Route, Navigate } from 'react-router-dom';

import Landing from './pages/Landing.jsx';
import NotFound from './pages/NotFound.jsx';

import PatientLogin from './pages/patient/Login.jsx';
import PatientHome from './pages/patient/Home.jsx';
import TriageChat from './pages/patient/TriageChat.jsx';
import ConditionForm from './pages/patient/ConditionForm.jsx';
import ServiceRecommendation from './pages/patient/ServiceRecommendation.jsx';
import HospitalResults from './pages/patient/HospitalResults.jsx';
import HospitalDetail from './pages/patient/HospitalDetail.jsx';
import HospitalServices from './pages/patient/HospitalServices.jsx';
import HospitalDirections from './pages/patient/HospitalDirections.jsx';
import BookingConfirmation from './pages/patient/BookingConfirmation.jsx';
import MySchedule from './pages/patient/MySchedule.jsx';
import ReservationDetail from './pages/patient/ReservationDetail.jsx';
import PatientMessages from './pages/patient/Messages.jsx';
import ConversationDetail from './pages/patient/ConversationDetail.jsx';
import PatientNotifications from './pages/patient/Notifications.jsx';
import Profile from './pages/patient/Profile.jsx';
import Family from './pages/patient/Family.jsx';
import Emergency from './pages/patient/Emergency.jsx';
import PatientSettings from './pages/patient/Settings.jsx';
import HealthTips from './pages/patient/HealthTips.jsx';
import HospitalSearch from './pages/patient/HospitalSearch.jsx';
import FAQs from './pages/patient/FAQs.jsx';
import QueueStatus from './pages/patient/QueueStatus.jsx';

import AdminLogin from './pages/admin/Login.jsx';
import AdminOverview from './pages/admin/Overview.jsx';
import LiveQueue from './pages/admin/LiveQueue.jsx';
import Incoming from './pages/admin/Incoming.jsx';
import AdminPatientDetail from './pages/admin/PatientDetail.jsx';
import Analytics from './pages/admin/Analytics.jsx';
import HospitalProfile from './pages/admin/HospitalProfile.jsx';
import AdminMessages from './pages/admin/Messages.jsx';
import AdminNotifications from './pages/admin/Notifications.jsx';
import Users from './pages/admin/Users.jsx';
import AdminSettings from './pages/admin/Settings.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      {/* Patient */}
      <Route path="/login/patient" element={<PatientLogin />} />
      <Route path="/patient" element={<Navigate to="/patient/home" replace />} />
      <Route path="/patient/home" element={<PatientHome />} />
      <Route path="/patient/triage" element={<TriageChat />} />
      <Route path="/patient/condition-form" element={<ConditionForm />} />
      <Route path="/patient/recommendation" element={<ServiceRecommendation />} />
      <Route path="/patient/results" element={<HospitalResults />} />
      <Route path="/patient/search" element={<HospitalSearch />} />
      <Route path="/patient/hospital/:id" element={<HospitalDetail />} />
      <Route path="/patient/hospital/:id/services" element={<HospitalServices />} />
      <Route path="/patient/hospital/:id/directions" element={<HospitalDirections />} />
      <Route path="/patient/booking/confirm" element={<BookingConfirmation />} />
      <Route path="/patient/schedule" element={<MySchedule />} />
      <Route path="/patient/reservation/:id" element={<ReservationDetail />} />
      <Route path="/patient/messages" element={<PatientMessages />} />
      <Route path="/patient/messages/:id" element={<ConversationDetail />} />
      <Route path="/patient/notifications" element={<PatientNotifications />} />
      <Route path="/patient/profile" element={<Profile />} />
      <Route path="/patient/family" element={<Family />} />
      <Route path="/patient/emergency" element={<Emergency />} />
      <Route path="/patient/settings" element={<PatientSettings />} />
      <Route path="/patient/tips" element={<HealthTips />} />
      <Route path="/patient/faqs" element={<FAQs />} />
      <Route path="/patient/queue" element={<QueueStatus />} />

      {/* Admin */}
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminOverview />} />
      <Route path="/admin/queue" element={<LiveQueue />} />
      <Route path="/admin/incoming" element={<Incoming />} />
      <Route path="/admin/patient/:id" element={<AdminPatientDetail />} />
      <Route path="/admin/analytics" element={<Analytics />} />
      <Route path="/admin/profile" element={<HospitalProfile />} />
      <Route path="/admin/messages" element={<AdminMessages />} />
      <Route path="/admin/notifications" element={<AdminNotifications />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/settings" element={<AdminSettings />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
