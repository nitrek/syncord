import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { SyncordService } from '../services/syncord-service.service'
declare var $:any;

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  headerNames: String[];
  public tableData1: TableData;
  public tableData2: TableData;

  issuesList;

  constructor(private http:Http, private service:SyncordService) { }
    ngOnInit(){
       this.headerNames = [
         'Deal Name',
         'Issuer',
         'Deal Size',
         'Syndicate Members',
         'My Role',
         'Allocated Size',
         'Status'
       ];

       this.tableData1 = {
        headerRow: [
         'Deal Name',
         'Issuer',
         'Deal Size',
         'Syndicate Members',
         'My Role',
         'Allocated Size',
         'Status'
       ],
        dataRows: [
            ['1', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
            ['2', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
            ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
            ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
            ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
            ['6', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
        ]
    };

    this.getIssuesList();
    }

    getIssuesList() {
      const url = this.service.GET_ISSUES_URL;
  
      this.http.get(url).subscribe(
        (response) => {
          console.log('Resp ', response);
          let responseText = response.json();
          this.issuesList = responseText;
          console.log('Issues List ', this.issuesList);
        },
        (error) => {
          console.log("Error in getting users list : " + error);
        },
        () => {
          //this.getLeaderBoardData();
          //this.getMatchInfo();
        }
      )
    }
}
