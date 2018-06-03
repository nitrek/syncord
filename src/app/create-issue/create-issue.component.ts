import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { SyncordService } from '../services/syncord-service.service'

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.css']
})
export class CreateIssueComponent implements OnInit {

  constructor(private http:Http, private service:SyncordService) { }

  peerBanksList;
  selectedBanksList = new Array();

  dealName: string;
  issuer: string;
  issueSize:number;

  ngOnInit() {
    this.getBankList();
  }

  getBankList() {
    const url = this.service.GET_PEERS_URL;

    this.http.get(url).subscribe(
      (response) => {
        let responseText = response.json();
        this.peerBanksList = responseText.peers;
        //console.log('Peers List ', this.peerBanksList);
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

  addBank(bankName) {
    this.selectedBanksList.push(bankName);
    console.log('Selected Banks ', this.selectedBanksList);

    this.peerBanksList.splice(this.peerBanksList.indexOf(bankName), 1)
  }

  removeBank(bankName) {
    this.peerBanksList.push(bankName);
    this.selectedBanksList.splice(this.selectedBanksList.indexOf(bankName), 1);
  }

  isCreateEnabled() {
    return !!this.issuer && !!this.dealName && !!this.issueSize && this.selectedBanksList.length > 0;
  }

  createIssue() {
    const url = this.service.CREATE_ISSUE_URL;
    const parsedUrl = url + 
                      "?issueName=" + this.dealName +
                      "&issueSize=" + this.issueSize + 
                      "&issuer=" + this.issuer +
                      "&party=" + this.selectedBanksList[0];

    this.http.get(parsedUrl).subscribe(
      (response) => {
        console.log('Create issue status : ' + response);
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
}
