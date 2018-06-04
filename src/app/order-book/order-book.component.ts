import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { SyncordService } from '../services/syncord-service.service';

declare var $:any;

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.css']
})


export class OrderBookComponent implements OnInit {
  headerNames: String[];

  public tableData1: TableData;
  public tableData2: TableData;

  issuesIdMap = new Map();

  orderList;

  sharedOrderIds = new Map();

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

    this.loadIssuesMap();
    this.getMyOrders();
    this.loadSharedOrders();
    }

    getMyOrders() {
      //const url = '../../assets/data/myorders.json';
      const url = this.service.GET_MY_ORDERS;
  
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

    loadIssuesMap() {
      const url = this.service.GET_ISSUES_URL;
  
      this.http.get(url).subscribe(
        (response) => {
          console.log('Resp ', response);
          let issues = response.json();
          
          for(let issue of issues) {
            console.log(issue);
            this.issuesIdMap.set(issue.state.data.issueName, issue.state.data.linearId.id)
          }
          console.log('Issues Map ', this.issuesIdMap);
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
          let orders = response.json();
          
          for(let order of orders) {
            console.log(order);
            this.sharedOrderIds.set(order.state.data.orderId, 'true');
          }
          // console.log('Issues Map ', this.issuesIdMap);
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
    isOrderShared(orderId) {
      if(!this.sharedOrderIds.get(orderId)) {
        return false;
      }
      else {
        return true;
      }
    }

    shareOrder(order) {
      const url = this.service.CREATE_ORDER;

      const parsedUrl = url + 
                        "?amount=" + order.orderAmount +
                        "&issueId=" + this.issuesIdMap.get(order.dealName) +
                        "&investorName=" + order.investor +
                        "&book=" + order.book + 
                        "&country=" + order.country +
                        "&orderId=" + order.orderID;

      console.log(parsedUrl);
  
      this.http.get(parsedUrl).subscribe(
        (response) => {
          console.log('Share order status : ' + response);
          this.getMyOrders();
          this.loadSharedOrders();
          this.showNotification('top', 'right');
        },
        (error) => {
          console.log("Error in sharing ordere : " + error);
        },
        () => {
          //this.getLeaderBoardData();
          //this.getMatchInfo();
        }
      )
    }

    showNotification(from, align){
      var type = ['','info','success','warning','danger'];
  
      var color = '#8EF3C5';//Math.floor((Math.random() * 4) + 1);
  
    $.notify({
        icon: "ti-announcement",
        message: "Order shared successfully"
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


