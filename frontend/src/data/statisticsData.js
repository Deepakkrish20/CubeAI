import { FaUsers, FaProjectDiagram, FaUserTie, FaAward } from 'react-icons/fa';

export const STATISTICS_SECTION_META = {
  id: 'statistics',
};

/**
 * Counter metrics from the reference homepage — value and label only.
 */
export const statisticsData = [
  {
    id: 'happy-clients',
    label: 'Happy Clients',
    value: 850,
    suffix: '',
    prefix: '',
    icon: FaUsers,
    order: 1,
    startValue: 0,
    endValue: 850,
    duration: 2000,
    animate: true,
  },
  {
    id: 'projects-completed',
    label: 'Projects Completed',
    value: 1200,
    suffix: '',
    prefix: '',
    icon: FaProjectDiagram,
    order: 2,
    startValue: 0,
    endValue: 1200,
    duration: 2200,
    animate: true,
  },
  {
    id: 'dedicated-staff',
    label: 'Dedicated Staff',
    value: 120,
    suffix: '',
    prefix: '',
    icon: FaUserTie,
    order: 3,
    startValue: 0,
    endValue: 120,
    duration: 1800,
    animate: true,
  },
  {
    id: 'awards-achieved',
    label: 'Awards Achieved',
    value: 10,
    suffix: '',
    prefix: '',
    icon: FaAward,
    order: 4,
    startValue: 0,
    endValue: 10,
    duration: 1500,
    animate: true,
  },
];
