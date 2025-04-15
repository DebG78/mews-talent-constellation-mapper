
// Helper functions for employee-related color styling

// Get zone color
export const getZoneColor = (zone: string): string => {
  switch (zone) {
    case 'Acceleration':
      return 'bg-acceleration text-white';
    case 'Growth':
      return 'bg-development text-white';
    case 'Support':
      return 'bg-support text-white';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

// Get readiness color
export const getReadinessColor = (readiness: string): string => {
  switch (readiness) {
    case 'Ready Now':
      return 'bg-ready-now text-white';
    case 'Ready Soon':
      return 'bg-ready-soon text-white';
    case 'Not Ready':
      return 'bg-not-ready text-white';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};
