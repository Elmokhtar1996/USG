import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/serviceAdherant/api.service';
declare var google:any;

@Component({
  selector: 'app-adherants-statistique',
  templateUrl: './adherants-statistique.component.html',
  styleUrls: ['./adherants-statistique.component.css']
})
export class AdherantsStatistiqueComponent implements OnInit {
  zebbi="jjjj";
  AgeAdherants:any = [];
  newArray:any = [];
  constructor(private apiService: ApiService,private actRoute: ActivatedRoute) {
this.readAgeAdherants();
   }

  ngOnInit(): void {
    
    google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(this.drawChartd);
  }
  drawChartd(){

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Mushrooms', 5],
      ['Onions', 1],
      ['Olives', 1],
      ['Zucchini', 1],
      ['Pepperoni', 2]
    ]);
    
    // Set chart options
    var options = {'title':'How Much Pizza I Ate Last Night',
                   'width':400,
                   'height':300};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);

  }
  readAgeAdherants(){
    this.apiService.getAgeAdherant().subscribe((data) => {
      this.AgeAdherants = data;
    console.log(this.zebbi)
     this.newArray = this.AgeAdherants.filter(function (el: { Sections: string; }) {
      return el.Sections =="Omnisports" 
     
      
    });
this.zebbi=this.newArray[0].zero_quatorz;
  })
}
}
