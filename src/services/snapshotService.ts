
import { Employee, EmployeeSnapshot } from "@/types/employee";
import { mockEmployees } from "./mockData";

// Create a new snapshot for an employee
export const createSnapshot = (
  employeeId: string, 
  snapshotType: 'Regular Cycle' | 'Manual', 
  context: string
): Employee | null => {
  // Find the employee
  const employeeIndex = mockEmployees.findIndex(emp => emp.id === employeeId);
  if (employeeIndex === -1) return null;
  
  const employee = mockEmployees[employeeIndex];
  
  // Create a new snapshot
  const newSnapshot: EmployeeSnapshot = {
    id: `snapshot-${Date.now()}`,
    dateCreated: new Date().toISOString(),
    snapshotType,
    context,
    performanceRating: employee.performanceRating,
    skillEnablers: { ...employee.skillEnablers },
    zonePosition: { ...employee.zonePosition },
    readiness: employee.readiness,
    position: employee.position,
    jobGrade: employee.jobGrade
  };
  
  // Add the snapshot to the employee
  if (!employee.snapshots) {
    employee.snapshots = [];
  }
  
  employee.snapshots.push(newSnapshot);
  
  // Replace the employee in the mockEmployees array
  mockEmployees[employeeIndex] = { ...employee };
  
  return employee;
};

// Create snapshots for all employees (e.g., during a review cycle)
export const createSnapshotsForAllEmployees = (
  snapshotType: 'Regular Cycle' | 'Manual',
  context: string
): void => {
  mockEmployees.forEach(employee => {
    createSnapshot(employee.id, snapshotType, context);
  });
};

// Get all snapshots for an employee
export const getEmployeeSnapshots = (employeeId: string): EmployeeSnapshot[] => {
  const employee = mockEmployees.find(emp => emp.id === employeeId);
  return employee?.snapshots || [];
};

// Get a specific snapshot
export const getEmployeeSnapshot = (employeeId: string, snapshotId: string): EmployeeSnapshot | null => {
  const snapshots = getEmployeeSnapshots(employeeId);
  return snapshots.find(snapshot => snapshot.id === snapshotId) || null;
};

// Compare current employee data with a snapshot
export const compareWithSnapshot = (employeeId: string, snapshotId: string) => {
  const employee = mockEmployees.find(emp => emp.id === employeeId);
  if (!employee) return null;
  
  const snapshot = getEmployeeSnapshot(employeeId, snapshotId);
  if (!snapshot) return null;
  
  return {
    current: {
      performanceRating: employee.performanceRating,
      skillEnablers: employee.skillEnablers,
      zonePosition: employee.zonePosition,
      readiness: employee.readiness,
      position: employee.position,
      jobGrade: employee.jobGrade
    },
    snapshot: {
      performanceRating: snapshot.performanceRating,
      skillEnablers: snapshot.skillEnablers,
      zonePosition: snapshot.zonePosition,
      readiness: snapshot.readiness,
      position: snapshot.position,
      jobGrade: snapshot.jobGrade
    },
    dateCreated: snapshot.dateCreated,
    context: snapshot.context
  };
};
