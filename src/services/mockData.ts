
import { Employee, MomentumScore } from "@/types/employee";

// Generate a random number between min and max (inclusive)
const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Determine zone based on performance rating and skill enablers
const determineZone = (performanceRating: number, enablersAvg: number): 'Acceleration' | 'Growth' | 'Support' => {
  const score = performanceRating * 0.7 + enablersAvg * 0.3;
  
  if (score >= 4) return 'Acceleration';
  if (score >= 2.5) return 'Growth';
  return 'Support';
};

// Determine random position within a zone
const determinePosition = (zone: 'Acceleration' | 'Growth' | 'Support') => {
  let x, y;
  
  // Different positioning logic for each zone
  switch (zone) {
    case 'Acceleration':
      // Top right quadrant
      x = randomBetween(50, 95);
      y = randomBetween(5, 50);
      break;
    case 'Growth':
      // Middle area
      x = randomBetween(25, 75);
      y = randomBetween(25, 75);
      break;
    case 'Support':
      // Bottom left quadrant
      x = randomBetween(5, 50);
      y = randomBetween(50, 95);
      break;
  }
  
  return { x, y, zone };
};

// Generate a random momentum score based on zone and performance
const generateMomentumScore = (zone: 'Acceleration' | 'Growth' | 'Support', performanceRating: number): MomentumScore => {
  // Base score is influenced by zone and performance rating
  let baseScore: number;
  
  switch (zone) {
    case 'Acceleration':
      baseScore = randomBetween(60, 90);
      break;
    case 'Growth':
      baseScore = randomBetween(40, 70);
      break;
    case 'Support':
      baseScore = randomBetween(20, 50);
      break;
  }
  
  // Adjust based on performance rating
  baseScore += (performanceRating - 3) * 5;
  baseScore = Math.max(10, Math.min(95, baseScore));
  
  // Generate component scores
  const velocity = baseScore + randomBetween(-10, 10);
  const acceleration = baseScore + randomBetween(-15, 15);
  const consistency = baseScore + randomBetween(-20, 20);
  
  // Normalize component scores
  const normalizedVelocity = Math.max(10, Math.min(95, velocity));
  const normalizedAcceleration = Math.max(10, Math.min(95, acceleration));
  const normalizedConsistency = Math.max(10, Math.min(95, consistency));
  
  // Generate a previous score that makes sense with the current score
  const previousScore = baseScore - randomBetween(-5, 10);
  const normalizedPreviousScore = Math.max(5, Math.min(100, previousScore));
  
  // Determine trend
  let trend: 'increasing' | 'stable' | 'decreasing';
  if (baseScore > normalizedPreviousScore + 5) {
    trend = 'increasing';
  } else if (baseScore < normalizedPreviousScore - 5) {
    trend = 'decreasing';
  } else {
    trend = 'stable';
  }
  
  // Generate history
  const history = [];
  const now = new Date();
  
  // Add 6 history points going back 6 months
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now);
    date.setMonth(now.getMonth() - i);
    
    // Generate a score that leads up to the current score
    const historyScore = normalizedPreviousScore + (i * (baseScore - normalizedPreviousScore) / 5);
    
    history.push({
      date: date.toISOString(),
      score: Math.round(historyScore)
    });
  }
  
  return {
    score: Math.round(baseScore),
    velocity: Math.round(normalizedVelocity),
    acceleration: Math.round(normalizedAcceleration),
    consistency: Math.round(normalizedConsistency),
    previousScore: Math.round(normalizedPreviousScore),
    trend,
    history
  };
};

// Generate sample employees
export const generateMockEmployees = (count: number = 50): Employee[] => {
  const departments = ['Engineering', 'Marketing', 'Sales', 'Product', 'Customer Support', 'Operations', 'Finance', 'HR'];
  const positions = ['Manager', 'Director', 'Team Lead', 'Senior Specialist', 'Specialist', 'Coordinator', 'Associate'];
  const readinessOptions: ['Ready Now', 'Ready Soon', 'Not Ready'] = ['Ready Now', 'Ready Soon', 'Not Ready'];
  const jobGradeOptions: ['IC', 'Manager'] = ['IC', 'Manager'];
  
  return Array.from({ length: count }, (_, i) => {
    // Generate skill enablers
    const drive = randomBetween(1, 5);
    const learningAgility = randomBetween(1, 5);
    const innovation = randomBetween(1, 5);
    const adaptability = randomBetween(1, 5);
    
    // Calculate average enabler score
    const enablersAvg = (drive + learningAgility + innovation + adaptability) / 4;
    
    // Generate performance rating
    const performanceRating = randomBetween(1, 5);
    
    // Determine zone based on performance and enablers
    const zone = determineZone(performanceRating, enablersAvg);
    
    // Generate random join date in the last 5 years
    const joinDate = new Date();
    joinDate.setFullYear(joinDate.getFullYear() - randomBetween(0, 5));
    joinDate.setMonth(randomBetween(0, 11));
    joinDate.setDate(randomBetween(1, 28));

    // Assign either IC or Manager role
    const jobGrade = jobGradeOptions[randomBetween(0, 1)];
    
    // Generate momentum score
    const momentumScore = generateMomentumScore(zone, performanceRating);
    
    return {
      id: `EMP-${1000 + i}`,
      name: `Employee ${i + 1}`,
      position: positions[randomBetween(0, positions.length - 1)],
      department: departments[randomBetween(0, departments.length - 1)],
      performanceRating,
      readiness: readinessOptions[randomBetween(0, 2)],
      skillEnablers: {
        drive,
        learningAgility,
        innovation,
        adaptability,
      },
      zonePosition: determinePosition(zone),
      joinDate: joinDate.toISOString().split('T')[0],
      jobGrade: jobGrade,
      momentumScore: momentumScore
    };
  });
};

// Export 50 random employees
export const mockEmployees = generateMockEmployees(50);

// Get employees by zone
export const getEmployeesByZone = (zone: 'Acceleration' | 'Growth' | 'Support'): Employee[] => {
  return mockEmployees.filter(emp => emp.zonePosition.zone === zone);
};

// Get employee distribution by zone
export const getZoneDistribution = () => {
  const acceleration = mockEmployees.filter(emp => emp.zonePosition.zone === 'Acceleration').length;
  const growth = mockEmployees.filter(emp => emp.zonePosition.zone === 'Growth').length;
  const support = mockEmployees.filter(emp => emp.zonePosition.zone === 'Support').length;
  
  return {
    acceleration,
    growth,
    support,
    total: mockEmployees.length
  };
};

// Get readiness distribution
export const getReadinessDistribution = () => {
  const readyNow = mockEmployees.filter(emp => emp.readiness === 'Ready Now').length;
  const readySoon = mockEmployees.filter(emp => emp.readiness === 'Ready Soon').length;
  const notReady = mockEmployees.filter(emp => emp.readiness === 'Not Ready').length;
  
  return {
    readyNow,
    readySoon,
    notReady,
    total: mockEmployees.length
  };
};

// Get department distribution
export const getDepartmentDistribution = () => {
  const departments = {} as Record<string, number>;
  
  mockEmployees.forEach(emp => {
    departments[emp.department] = (departments[emp.department] || 0) + 1;
  });
  
  return departments;
};
