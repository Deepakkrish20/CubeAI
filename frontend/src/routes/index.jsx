import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { ROUTES } from '@/constants/routes';

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Services = lazy(() => import('@/pages/Services'));
const Contact = lazy(() => import('@/pages/Contact'));
const ApplyNow = lazy(() => import('@/pages/ApplyNow'));
const EmiCalculator = lazy(() => import('@/pages/EmiCalculator'));
const Partners = lazy(() => import('@/pages/Partners'));
const Team = lazy(() => import('@/pages/Team'));
const Achievements = lazy(() => import('@/pages/Achievements'));
const Association = lazy(() => import('@/pages/Association'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.SERVICES} element={<Services />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path={ROUTES.APPLY_NOW} element={<ApplyNow />} />
        <Route path={ROUTES.EMI_CALCULATOR} element={<EmiCalculator />} />
        <Route path={ROUTES.PARTNERS} element={<Partners />} />
        <Route path={ROUTES.TEAM} element={<Team />} />
        <Route path={ROUTES.ACHIEVEMENTS} element={<Achievements />} />
        <Route path={ROUTES.ASSOCIATION} element={<Association />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
