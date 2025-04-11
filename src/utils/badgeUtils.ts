
/**
 * Returns the appropriate CSS class for a zone badge
 */
export const getZoneBadgeClass = (zone: string): string => {
  switch (zone) {
    case 'Acceleration':
      return 'bg-acceleration text-white hover:bg-acceleration/80';
    case 'Development':
      return 'bg-development text-white hover:bg-development/80';
    case 'Support':
      return 'bg-support text-white hover:bg-support/80';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

/**
 * Returns the appropriate CSS class for a readiness badge
 */
export const getReadinessBadgeClass = (readiness: string): string => {
  switch (readiness) {
    case 'Ready Now':
      return 'bg-ready-now text-white hover:bg-ready-now/80';
    case 'Ready Soon':
      return 'bg-ready-soon text-white hover:bg-ready-soon/80';
    case 'Not Ready':
      return 'bg-not-ready text-white hover:bg-not-ready/80';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};
