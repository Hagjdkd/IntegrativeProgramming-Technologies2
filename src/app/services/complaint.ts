import { Injectable } from '@angular/core';

// This is the Interface (The "Model")
export interface Complaint {
  id: number;
  user: string;
  status: string;
  issue: string;
}

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private allComplaints: Complaint[] = [
    { id: 101, user: 'John Doe', status: 'Pending', issue: 'Internet Down' },
    { id: 102, user: 'Alice Smith', status: 'Resolved', issue: 'Login Error' },
    { id: 103, user: 'Bob Brown', status: 'Pending', issue: 'Billing Query' },
    { id: 104, user: 'Charlie Day', status: 'In Progress', issue: 'Slow Speed' },
    { id: 105, user: 'Eve Night', status: 'Resolved', issue: 'Account Hack' },
  ];
  //Data Access
  getAll(): Complaint[] {
    return [...this.allComplaints];
  }
  //Abstraction
  filterData(term: string): Complaint[] {
    if (!term) return this.getAll();
    return this.allComplaints.filter(c =>
      c.user.toLowerCase().includes(term) || 
      c.issue.toLowerCase().includes(term)
    );
  }
 // Logic Centralization
  calculateTotalPages(totalItems: number, itemsPerPage: number): number {
    return Math.ceil(totalItems / itemsPerPage);
  }
}