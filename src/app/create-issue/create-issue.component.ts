import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.css']
})
export class CreateIssueComponent implements OnInit {

  constructor(private http:Http) { }

  peerBanksList;
  selectedBanksList = new Array();;

  ngOnInit() {
    this.getBankList();
  }

  getBankList() {
    const url = 'http://abcipl.club:10013/api/obligation/peers';

    this.http.get(url).subscribe(
      (response) => {
        let responseText = response.json();

        this.peerBanksList = responseText.peers;
        console.log('Peers List ', this.peerBanksList);

        // for (let user of responseText) {
        //   this.userNameMap.set(user.key.toLowerCase(), user.name);
        // }
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
}
