import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { StatisticalService } from "../../../_sevices/statistical/statistical.service";
import { Report } from "../../../../assets/interface/interface";
import { LoadingService } from 'src/app/_sevices/loading/loading.service';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.scss']
})
export class StatisticalComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  report!: Report;
  isLoading= false;
  public barChartOptions: ChartConfiguration['options'] = {

    responsive: true,
    elements: {
      line: {
        tension: 0.4
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
        align:"end",
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        display: false,
      },
    }

  };
  public barChartType: any = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData!: ChartData<'bar'>;

  constructor(private statisticalService: StatisticalService,private loadingService:LoadingService) {
    document.title = "Doanh thu";
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.statisticalService.getStatistical().subscribe(res => {
      this.isLoading = false;
      this.report = res;
      this.barChartData = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
          { data: res.reportIncomeMonth, label: 'Doanh thu' },
          { data: res.reportOrderMonth, label: 'Số đơn hàng', yAxisID: "y1" },
        ]
      }
    })
  }

}
