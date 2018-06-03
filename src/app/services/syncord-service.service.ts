import { Injectable } from '@angular/core';

@Injectable()
export class SyncordService {

  currentBanker = "HSBC";
  userName = "Scott Tiger";
  baseUrl = "http://abcipl.club:10013/api/syncord";


  public GET_PEERS_URL = this.baseUrl + "/peers";
  public GET_ISSUES_URL = this.baseUrl + "/issues";
  public GET_ORDERS_URL = this.baseUrl + "/orders";
  public CREATE_ISSUE_URL = this.baseUrl + "/createIssue";
  public PUBLISH_ISSUE_URL = "http://abcipl.club:10016/api/syncord/updateStatus";
  public CREATE_ORDER = this.baseUrl + '/createOrder';
  public GET_MY_ORDERS = 'http://35.237.160.64:5000/hsbc';
  
  constructor() { }

  /**
   * Returns the name of the leadBanker for the current node 
   */
  getCurrentBanker() {
    return this.currentBanker;
  }

  getUserName() {
    return this.userName;
  }

  parseBankName(stringToParse) {
    return (stringToParse.split(',', 1)[0].substring(2));
  }

  getMyRole(leadBankerName) {
    //console.log('Service banker ' + this.parseBankName(leadBankerName));
    if(this.currentBanker === leadBankerName) {
      return 'Lead Banker';
    }
    else {
      return 'Book Runner';
    }
  }


}
