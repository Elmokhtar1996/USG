import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { ApiService } from '../../services/serviceAdherant/api.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      dateClick: (arg: DateClickArg) => this.handleDateClick(arg),
      events: [] // Supprimez les événements statiques ici
    };

    // Appelez la méthode pour récupérer les événements depuis la base de données
    this.getEventsFromDatabase();
  }

  handleDateClick(arg: DateClickArg) {
    const title = prompt('Entrez le titre de l\'événement:');
    if (title) {
      const time = prompt('Entrez l\'heure de l\'événement (HH:MM):');
      if (time) {
        const eventDateTime = arg.dateStr + 'T' + time; // Concaténez la date et l'heure
        this.calendarOptions.events = this.calendarOptions.events.concat({
          title: title,
          date: eventDateTime
        });
        // Envoyer les données de l'événement à votre backend
        this.apiService.ajouterEvenement({ title: title, date: eventDateTime }).subscribe(
          (response: any) => {
            console.log('Événement ajouté avec succès:', response);
          },
          (error: any) => {
            console.error('Erreur lors de l\'ajout de l\'événement:', error);
          }
        );
      }
    }
  }
  deleteEvent(eventId: number) {
    // Supprimer l'événement du calendrier
    this.calendarOptions.events = this.calendarOptions.events.filter((event: { id: number; }) => event.id !== eventId);
  
    // Appeler la méthode de suppression dans le service API
    this.apiService.supprimerEvenement(eventId).subscribe(
      () => {
        console.log('Événement supprimé avec succès');
      },
      (error: any) => {
        console.error('Erreur lors de la suppression de l\'événement:', error);
      }
    );
  }
  getEventsFromDatabase() {
    this.apiService.getEvenement().subscribe(
      (data: any) => { // Correction du type de données
        // Vérification si les données sont un tableau
        if (Array.isArray(data)) {
          // Mettez à jour le tableau events avec les données récupérées
          this.calendarOptions.events = data.map(event => {
            return {
              title: event.title,
              date: event.date
            };
          });
        } else {
          console.error('Erreur: Les données retournées ne sont pas au format attendu.');
        }
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des événements depuis la base de données:', error);
      }
    );
  }
  
}
