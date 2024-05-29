// pagination.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  currentPage: number = 1;

  constructor() { }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  getCurrentPage() {
    return this.currentPage;
  }
}
