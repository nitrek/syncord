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
  leadBanker;

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

    this.leadBanker = this.service.getCurrentBanker();
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

          //console.log('Banker ' + this.service.getMyRole(this.issuesList[1].state.data.coBanker));
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

    publishIssue(issue) {
      const url = this.service.PUBLISH_ISSUE_URL;

      const parsedUrl = url + 
                        "?id=" + issue.state.data.linearId.id +
                        "&party=" + issue.state.data.coBanker;

      console.log(parsedUrl);
  
      this.http.get(parsedUrl).subscribe(
        (response) => {
          console.log('Publish issue status : ' + response);
          this.getIssuesList();
          this.showNotification('top', 'right');
        },
        (error) => {
          console.log("Error in creating issue : " + error);
        },
        () => {
          //this.getLeaderBoardData();
          //this.getMatchInfo();
        }
      )
    }

    openOrders() {
      console.log('Clicked');
    }

    showNotification(from, align){
      var type = ['','info','success','warning','danger'];
  
      var color = '#8EF3C5';//Math.floor((Math.random() * 4) + 1);
  
    $.notify({
        icon: "ti-announcement",
        message: "Deal published successfully"
      },{
          type: type[color],
          timer: 3000,
          placement: {
              from: from,
              align: align
          }
      });
  }
}
