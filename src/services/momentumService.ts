
import { Employee, MomentumScore, EmployeeSnapshot } from "@/types/employee";

// Calculate momentum score based on employee data and snapshots
export const calculateMomentumScore = (employee: Employee): MomentumScore => {
  const snapshots = employee.snapshots || [];
  
  // If there are no snapshots or only one, we can't calculate momentum properly
  if (snapshots.length <= 1) {
    return {
      score: 50, // Default "stable" score
      velocity: 50,
      acceleration: 50,
      consistency: 50,
      trend: 'stable',
      history: [{
        date: new Date().toISOString(),
        score: 50
      }]
    };
  }
  
  // Sort snapshots by date (oldest first)
  const sortedSnapshots = [...snapshots].sort((a, b) => 
    new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime()
  );
  
  // Calculate velocity (50% of score)
  const velocity = calculateVelocity(sortedSnapshots, employee);
  
  // Calculate acceleration (30% of score)
  const acceleration = calculateAcceleration(sortedSnapshots);
  
  // Calculate consistency (20% of score)
  const consistency = calculateConsistency(sortedSnapshots);
  
  // Calculate overall score (weighted average)
  const score = Math.round((velocity * 0.5) + (acceleration * 0.3) + (consistency * 0.2));
  
  // Determine trend by comparing with previous score
  const previousScore = employee.momentumScore?.score || 50;
  
  let trend: 'increasing' | 'stable' | 'decreasing' = 'stable';
  if (score > previousScore + 5) {
    trend = 'increasing';
  } else if (score < previousScore - 5) {
    trend = 'decreasing';
  }
  
  // Generate history data (including current score)
  const history = generateHistoryData(sortedSnapshots, score);
  
  return {
    score,
    velocity,
    acceleration,
    consistency,
    previousScore,
    trend,
    history
  };
};

// Calculate velocity component (50% of momentum score)
const calculateVelocity = (snapshots: EmployeeSnapshot[], employee: Employee): number => {
  // Measure performance rating improvement
  const performanceProgress = calculatePerformanceProgress(snapshots);
  
  // Measure skill enablers improvement
  const skillProgress = calculateSkillEnablersProgress(snapshots);
  
  // Measure development goals achievement
  const developmentProgress = calculateDevelopmentProgress(employee);
  
  // Weighted average of the three components
  return Math.round((performanceProgress * 0.4) + (skillProgress * 0.4) + (developmentProgress * 0.2));
};

// Calculate performance rating progress
const calculatePerformanceProgress = (snapshots: EmployeeSnapshot[]): number => {
  if (snapshots.length < 2) return 50; // Default to middle if not enough data
  
  const recentSnapshots = snapshots.slice(-4); // Use last 4 snapshots or less
  
  // Calculate slope of performance ratings
  const oldest = recentSnapshots[0].performanceRating;
  const newest = recentSnapshots[recentSnapshots.length - 1].performanceRating;
  const difference = newest - oldest;
  
  // Convert to a 0-100 scale
  // A +2 point improvement (on 5-point scale) is considered excellent (100)
  // A -1 point decline is considered poor (0)
  const scaledProgress = 50 + (difference * 33.3);
  
  return Math.max(0, Math.min(100, Math.round(scaledProgress)));
};

// Calculate skill enablers progress
const calculateSkillEnablersProgress = (snapshots: EmployeeSnapshot[]): number => {
  if (snapshots.length < 2) return 50;
  
  const recentSnapshots = snapshots.slice(-3); // Use last 3 snapshots or less
  
  // Get the oldest and newest snapshot
  const oldest = recentSnapshots[0];
  const newest = recentSnapshots[recentSnapshots.length - 1];
  
  // Calculate average skill enabler scores
  const oldestAvg = (oldest.skillEnablers.drive + 
                      oldest.skillEnablers.learningAgility + 
                      oldest.skillEnablers.innovation + 
                      oldest.skillEnablers.adaptability) / 4;
                      
  const newestAvg = (newest.skillEnablers.drive + 
                      newest.skillEnablers.learningAgility + 
                      newest.skillEnablers.innovation + 
                      newest.skillEnablers.adaptability) / 4;
  
  const difference = newestAvg - oldestAvg;
  
  // Convert to a 0-100 scale (similar to performance scaling)
  const scaledProgress = 50 + (difference * 33.3);
  
  return Math.max(0, Math.min(100, Math.round(scaledProgress)));
};

// Calculate development goals progress
const calculateDevelopmentProgress = (employee: Employee): number => {
  const developmentOptions = employee.developmentOptions || [];
  
  if (developmentOptions.length === 0) return 50;
  
  // Count completed items vs total items
  const completed = developmentOptions.filter(option => option.status === 'Completed').length;
  const inProgress = developmentOptions.filter(option => option.status === 'In Progress').length;
  
  // Weight completed as 1, in progress as 0.5
  const progressRate = (completed + (inProgress * 0.5)) / developmentOptions.length;
  
  // Convert to 0-100 scale
  return Math.round(progressRate * 100);
};

// Calculate acceleration component (30% of momentum score)
const calculateAcceleration = (snapshots: EmployeeSnapshot[]): number => {
  if (snapshots.length < 3) return 50; // Need at least 3 snapshots to measure acceleration
  
  // Calculate performance rating acceleration
  const recentSnapshots = snapshots.slice(-3);
  
  // First period change
  const firstChange = recentSnapshots[1].performanceRating - recentSnapshots[0].performanceRating;
  
  // Second period change
  const secondChange = recentSnapshots[2].performanceRating - recentSnapshots[1].performanceRating;
  
  // Acceleration is the difference between the two changes
  const acceleration = secondChange - firstChange;
  
  // Convert to 0-100 scale
  // Positive acceleration is good, negative is bad
  const scaledAcceleration = 50 + (acceleration * 25);
  
  return Math.max(0, Math.min(100, Math.round(scaledAcceleration)));
};

// Calculate consistency component (20% of momentum score)
const calculateConsistency = (snapshots: EmployeeSnapshot[]): number => {
  if (snapshots.length < 3) return 50;
  
  // Get performance ratings
  const ratings = snapshots.map(s => s.performanceRating);
  
  // Calculate standard deviation of ratings
  const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
  const squaredDifferences = ratings.map(r => Math.pow(r - avg, 2));
  const avgSquaredDiff = squaredDifferences.reduce((sum, d) => sum + d, 0) / squaredDifferences.length;
  const stdDev = Math.sqrt(avgSquaredDiff);
  
  // Lower standard deviation means higher consistency
  // Convert to 0-100 scale (0.5 stdDev is excellent consistency, 2.0 is poor)
  const scaledConsistency = 100 - (stdDev * 25);
  
  return Math.max(0, Math.min(100, Math.round(scaledConsistency)));
};

// Generate history data for charting
const generateHistoryData = (snapshots: EmployeeSnapshot[], currentScore: number): Array<{date: string, score: number}> => {
  // Generate simulated historical momentum scores
  // In a real implementation, we would calculate actual scores for each point in time
  const history = snapshots.map((snapshot, index) => {
    // For this mock, we'll generate synthetic scores that lead up to the current score
    const baseScore = 40 + Math.random() * 20; // Random starting point
    const trend = currentScore > 50 ? 1 : -1; // Trend direction based on current score
    const progress = (index / snapshots.length) * trend * (Math.abs(currentScore - 50));
    
    return {
      date: snapshot.dateCreated,
      score: Math.round(baseScore + progress)
    };
  });
  
  // Add current score at current date
  history.push({
    date: new Date().toISOString(),
    score: currentScore
  });
  
  return history;
};

// Get momentum score category description
export const getMomentumCategory = (score: number): {
  label: string;
  description: string;
  color: string;
} => {
  if (score >= 80) {
    return {
      label: 'High Positive',
      description: 'Rapid, accelerating improvement',
      color: '#22c55e' // Green
    };
  } else if (score >= 60) {
    return {
      label: 'Positive',
      description: 'Steady, reliable growth',
      color: '#0088CC' // Blue
    };
  } else if (score >= 40) {
    return {
      label: 'Stable',
      description: 'Maintaining consistent performance',
      color: '#eab308' // Yellow
    };
  } else if (score >= 20) {
    return {
      label: 'Concerning',
      description: 'Slowing growth or slight decline',
      color: '#f97316' // Orange
    };
  } else {
    return {
      label: 'Negative',
      description: 'Significant performance decline',
      color: '#ef4444' // Red
    };
  }
};

// Calculate momentum scores for all employees
export const calculateMomentumScoresForAll = (employees: Employee[]): Employee[] => {
  return employees.map(employee => ({
    ...employee,
    momentumScore: calculateMomentumScore(employee)
  }));
};

// Get department average momentum
export const getDepartmentMomentumAverages = (employees: Employee[]): Record<string, number> => {
  const departments: Record<string, {total: number, count: number}> = {};
  
  // Calculate sum and count for each department
  employees.forEach(employee => {
    if (employee.momentumScore) {
      if (!departments[employee.department]) {
        departments[employee.department] = { total: 0, count: 0 };
      }
      departments[employee.department].total += employee.momentumScore.score;
      departments[employee.department].count++;
    }
  });
  
  // Calculate averages
  const averages: Record<string, number> = {};
  Object.entries(departments).forEach(([dept, data]) => {
    averages[dept] = Math.round(data.total / data.count);
  });
  
  return averages;
};

// Get high momentum employees
export const getHighMomentumEmployees = (employees: Employee[], limit: number = 5): Employee[] => {
  return [...employees]
    .filter(emp => emp.momentumScore && emp.momentumScore.score >= 60)
    .sort((a, b) => (b.momentumScore?.score || 0) - (a.momentumScore?.score || 0))
    .slice(0, limit);
};

// Get most improved momentum employees
export const getMostImprovedEmployees = (employees: Employee[], limit: number = 5): Employee[] => {
  return [...employees]
    .filter(emp => emp.momentumScore && emp.momentumScore.previousScore !== undefined)
    .sort((a, b) => {
      const aImprovement = (a.momentumScore?.score || 0) - (a.momentumScore?.previousScore || 0);
      const bImprovement = (b.momentumScore?.score || 0) - (b.momentumScore?.previousScore || 0);
      return bImprovement - aImprovement;
    })
    .slice(0, limit);
};
