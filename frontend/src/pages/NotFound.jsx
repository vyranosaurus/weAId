import { Link } from 'react-router-dom';
import Wordmark from '../components/shared/Wordmark.jsx';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-container-padding">
      <div className="max-w-md w-full bg-white rounded-xl shadow-card p-8 text-center space-y-stack-md">
        <Wordmark size="md" tone="dark" />
        <h1 className="font-display-md text-display-md text-on-surface mt-4">404 — Hindi makita</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Mukhang nawala kayo sa pila. Bumalik tayo sa simula.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center bg-primary-container text-white font-label-bold text-label-bold uppercase rounded-full px-6 py-3"
        >
          Bumalik sa Home
        </Link>
      </div>
    </div>
  );
}
