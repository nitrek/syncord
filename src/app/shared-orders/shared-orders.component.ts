import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { SyncordService } from '../services/syncord-service.service';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-shared-orders',
  templateUrl: './shared-orders.component.html',
  styleUrls: ['./shared-orders.component.css']
})
export class SharedOrdersComponent implements OnInit {
  headerNames: String[];

  public tableData1: TableData;
  public tableData2: TableData;

  issuesIdMap = new Map();
  selectedIssueName;

  orderList;
  issues;

  constructor(private http: Http, 
              private service: SyncordService,
              private route: ActivatedRoute,) { }
  ngOnInit() {
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

    this.selectedIssueName = this.route.snapshot.paramMap.get('issuename');
    console.log('Selected Issue' + this.selectedIssueName);

    //this.loadIssuesMap();
    //this.getMyOrders();
    this.loadSharedOrders();
  }

  getMyOrders() {
    const url = '../../assets/data/myorders.json';

    this.http.get(url).subscribe(
      (response) => {
        console.log('Resp ', response);
        let responseText = response.json();
        this.orderList = responseText;
        console.log('Issues List ', this.orderList);
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

  

  loadSharedOrders() {
    const url = this.service.GET_ORDERS_URL;

    this.http.get(url).subscribe(
      (response) => {
        console.log('Orders ', response);
        let data = response.json();
        console.log('Orders ', data);

        console.log('Selected Name ' + this.selectedIssueName);
        console.log('Issue Name ' + data[0].state.data.issueName);

        this.issues = data.filter(issue => issue.state.data.issueName === this.selectedIssueName);
        // for(let issue of issues) {
        //   console.log(issue);
        //   this.issuesIdMap.set(issue.state.data.issueName, issue.state.data.linearId.id)
        // }
        console.log('Filtered issues ', this.issues);
      },
      (error) => {
        console.log("Error in getting orders list : " + error);
      },
      () => {
        //this.getLeaderBoardData();
        //this.getMatchInfo();
      }
    )
  }

  shareOrder(order) {
    const url = this.service.CREATE_ORDER;

    const parsedUrl = url +
      "?amount=" + order.orderAmount +
      "&party=" + 'HSBC' +
      "&issueId=" + this.issuesIdMap.get(order.dealName) +
      "&issueName=" + order.dealName +
      "&investorName=" + order.investor +
      "&book=" + order.book +
      "&country=" + order.country;

    console.log(parsedUrl);

    // this.http.get(parsedUrl).subscribe(
    //   (response) => {
    //     console.log('Publish issue status : ' + response);
    //     this.getIssuesList();
    //   },
    //   (error) => {
    //     console.log("Error in creating issue : " + error);
    //   },
    //   () => {
    //     //this.getLeaderBoardData();
    //     //this.getMatchInfo();
    //   }
    // )
  }

}
