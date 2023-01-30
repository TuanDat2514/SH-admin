import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.scss']
})
export class StatisticalComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display:true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }

  };
  public barChartType: any = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012','2013' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40, 44 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90, 44 ], label: 'Series B' }
    ]
  };
  constructor() {
    document.title = "Doanh thu";
  }

  ngOnInit(): void {
  }

}
