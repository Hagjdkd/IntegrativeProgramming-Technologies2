import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ComplaintService, Complaint } from '../services/complaint';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  private router = inject(Router);
  private complaintService = inject(ComplaintService);

  public filteredComplaints: Complaint[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 3;

  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  ngOnInit() {
    this.filteredComplaints = this.complaintService.getAll();

    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(5000), // Wait 5 seconds for user to stop typing
      map((term: string) => term.trim().toLowerCase()),
      distinctUntilChanged() // Comparison logic: Only process if actually different
    ).subscribe({
      next: (term: string) => {
        console.log('Final Search Result:', term);
        this.filteredComplaints = this.complaintService.filterData(term);
        this.currentPage = 1; 
      }
    });
  }

  onSearchChange(value: string): void {
    this.searchSubject.next(value);
  }

  get totalPages(): number {
    return this.complaintService.calculateTotalPages(
      this.filteredComplaints.length, 
      this.itemsPerPage
    );
  }
  logout(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }
}