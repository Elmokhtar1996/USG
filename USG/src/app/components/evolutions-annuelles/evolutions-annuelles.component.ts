import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/serviceAdherant/api.service';
declare var google: any;

@Component({
  selector: 'app-evolutions-annuelles',
  templateUrl: './evolutions-annuelles.component.html',
  styleUrls: ['./evolutions-annuelles.component.css']
})
export class EvolutionsAnnuellesComponent implements OnInit {
  genre: any;
  x: any;
  y: any;
  sections: any;
  saisons: any;
  statutAdhesion: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    google.charts.load('current', { packages: ['corechart', 'bar'] });
    google.charts.setOnLoadCallback(() => {
      this.getgenreadherents();
      this.getNombresSections();
      this.getSaison();
      this.getStatutAdhesion();
    });
  }

  getNombresSections() {
    this.apiService.getNombresSections().subscribe((data) => {
      this.sections = data;
      this.drawSectionsChart();
    });
  }

  drawSectionsChart() {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Section');
    data.addColumn('number', 'Adhérents');

    this.sections.forEach((section: any) => {
      data.addRow([section.NomSection, section.nombre_adherents]);
    });

    const options = {
    
      bar: { groupWidth: '75%' },
      hAxis: {
        title: 'Sections',
        textStyle: { fontSize: 12, color: '#333' },
        titleTextStyle: { fontSize: 14, bold: true, color: '#333' },
        slantedText: true,
        slantedTextAngle: 45
      },
      vAxis: {
        title: 'Nombre d\'adhérents',
        minValue: 0,
        textStyle: { fontSize: 12, color: '#333' }
      },
      legend: { position: 'none' }
    };

    const chart = new google.visualization.ColumnChart(document.getElementById('chart_div_sections'));
    chart.draw(data, options);
  }

  getgenreadherents() {
    this.apiService.getgenreadherent().subscribe((data) => {
      this.genre = data;
      this.x = this.genre[0].nombre_feminins;
      this.y = this.genre[0].nombre_masculins;
      this.drawAxisTickColors();
      this.drawChartdhf();
      this.drawChartd();
      this.drawChartdgrinois();
    });
  }

  getStatutAdhesion() {
    this.apiService.getStatutAdhesion().subscribe((data) => {
      this.statutAdhesion = data;
      this.adhesionChart();
    });
  }

  getSaison() {
    this.apiService.getSaison().subscribe((data: any) => {
      this.saisons = data.filter((saison: any) => saison.saison !== 'Inconnue');
      this.saisons.sort((a: { saison: string; }, b: { saison: string; }) => 
        new Date(a.saison.split(' - ')[0]).getTime() - new Date(b.saison.split(' - ')[0]).getTime()
      );
      this.drawSaisonChart();
    });
  }

  drawSaisonChart() {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Saison');
    data.addColumn('number', 'Nombre d\'adhérents');

    this.saisons.forEach((saison: any) => {
      data.addRow([saison.saison, saison.nombre_adherents]);
    });

    const options = {
  
      hAxis: {
        title: 'Saisons',
        textStyle: { fontSize: 12, color: '#333' },
        titleTextStyle: { fontSize: 14, bold: true, color: '#333' },
        slantedText: true,
        slantedTextAngle: 45
      },
      vAxis: {
        title: 'Nombre d\'adhérents',
        minValue: 0,
        textStyle: { fontSize: 12, color: '#333' }
      },
      legend: { position: 'none' },
      curveType: 'function'
    };

    const chart = new google.visualization.LineChart(document.getElementById('chart_div_saison'));
    chart.draw(data, options);
  }

  adhesionChart() {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Statuts Adhésion');
    data.addColumn('number', 'Nombre d\'adhérents');
    
    this.statutAdhesion.forEach((saison: any) => {
      data.addRow([saison.statutAdhesion, saison.nombre]);
    });

    const options = {
    
      colors: ['#3366CC', '#DC3912', '#FF9900'] // Spécifiez les couleurs ici
    };

    const chart = new google.visualization.PieChart(document.getElementById('chart_div_adhesion'));
    chart.draw(data, options);
  }

  drawAxisTickColors() {
    const data = google.visualization.arrayToDataTable([
      ['Age', 'Femme', 'Homme'],
      ['0/6', 22, 18],
      ['7/12', 131, 123],
      ['13/15', 9, 13],
      ['16/17', 4, 6],
      ['18/25', 2, 1],
      ['26/40', 0, 7],
      ['41/60', 1, 3],
      ['+60', 1, 1],
    ]);

    const options = {
      hAxis: {
        title: 'Total Population',
        minValue: 0,
        textStyle: { bold: true, fontSize: 12, color: '#4d4d4d' },
        titleTextStyle: { bold: true, fontSize: 10, color: '#4d4d4d' }
      },
      vAxis: {
        title: 'Age',
        textStyle: { fontSize: 8, bold: true, color: '#848484' },
        titleTextStyle: { fontSize: 14, bold: true, color: '#848484' }
      }
    };

    const chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }

  drawChartdhf() {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Femmes', this.x],
      ['Hommes', this.y],
    ]);

    const options = {
    
    };

    const chart = new google.visualization.PieChart(document.getElementById('chart_div2'));
    chart.draw(data, options);
  }

  drawChartd() {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['0/14', 90.06],
      ['15/29', 6.43],
      ['30/44', 1.75],
      ['45/59', 1.17],
      ['60/74', 0.29],
      ['+75', 0]
    ]);

    const options = {
    
    };

    const chart = new google.visualization.PieChart(document.getElementById('chart_div4'));
    chart.draw(data, options);
  }

  drawChartdgrinois() {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Grinois', 342],
      ['Autre', 117],
    ]);

    const options = {
   
    };

    const chart = new google.visualization.PieChart(document.getElementById('chart_div3'));
    chart.draw(data, options);
  }
}
