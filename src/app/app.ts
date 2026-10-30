import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Ticket {
  id: number;
  message: string;
  summary: string;
  category: string;
  priority: string;
  suggestedAction: string;
  status: string;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private http = inject(HttpClient);

  customerMessage: string = '';

  summary: string = '-';
  category: string = '-';
  priority: string = '-';
  suggestedAction: string = '-';

  tickets: Ticket[] = [];

  selectedStatus: string = 'ALL';

  analyzeRequest(): void {

    if (this.customerMessage.trim() === '') {
      alert('Please enter a customer message.');
      return;
    }

    this.http.post<Ticket>(
      'http://localhost:3000/analyze',
      {
        message: this.customerMessage
      }
    ).subscribe({

      next: (result) => {
        this.summary = result.summary;
        this.category = result.category;
        this.priority = result.priority;
        this.suggestedAction = result.suggestedAction;

        this.loadTickets();
      },

      error: (error) => {
        console.error(error);
        alert('Could not connect to the backend.');
      }

    });
  }

  loadTickets(): void {

    this.http.get<Ticket[]>(
      'http://localhost:3000/tickets'
    ).subscribe({

      next: (tickets) => {
        this.tickets = tickets;
      },

      error: (error) => {
        console.error(error);
      }

    });
  }

  clearTickets(): void {

    this.http.delete(
      'http://localhost:3000/tickets'
    ).subscribe({

      next: () => {
        this.tickets = [];
      },

      error: (error) => {
        console.error(error);
        alert('Could not clear tickets.');
      }

    });
  }

  resolveTicket(id: number): void {

    this.http.patch(
      `http://localhost:3000/tickets/${id}/resolve`,
      {}
    ).subscribe({

      next: () => {
        this.loadTickets();
      },

      error: (error) => {
        console.error(error);
        alert('Could not resolve ticket.');
      }

    });
  }

  get filteredTickets(): Ticket[] {

    if (this.selectedStatus === 'ALL') {
      return this.tickets;
    }

    return this.tickets.filter(
      ticket => ticket.status === this.selectedStatus
    );
  }
}