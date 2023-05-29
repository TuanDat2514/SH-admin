import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { StatisticalService } from "../../../_sevices/statistical/statistical.service";
import { Report } from "../../../../assets/interface/interface";

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.scss']
})
export class StatisticalComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  report!: Report;
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    elements: {
      line: {
        tension: 0.2
      }
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        grid: {
          color: 'rgba(255,0,0,0)',
        },
      },
      y: {
        min: 10,
        ticks: {
          color: 'red'
        },
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0)',
        },
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }

  };
  public barChartType: any = 'line';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40, 44], label: 'Doanh thu' },
      { data: [100, 150, 120, 200, 180, 300, 500, 350], label: 'Số đơn hàng', yAxisID: "y1" },
    ]
  };

  constructor(private statisticalService: StatisticalService) {
    document.title = "Doanh thu";
  }

  ngOnInit(): void {
    this.statisticalService.getReport().subscribe(res => {
      this.report = res;
    })
  }

}
