import { Injectable } from '@angular/core';

@Injectable()
export class SyncordService {

  currentBanker = "CITIBANK";
  userName = "David Cameron";
  baseUrl = "http://ec2-52-76-64-110.ap-southeast-1.compute.amazonaws.com:10007/api/syncord";


  public GET_PEERS_URL = this.baseUrl + "/peers";
  public GET_ISSUES_URL = this.baseUrl + "/issues";
  public GET_ORDERS_URL = this.baseUrl + "/orders";
  public CREATE_ISSUE_URL = this.baseUrl + "/createIssue";
  public PUBLISH_ISSUE_URL = "http://ec2-52-76-64-110.ap-southeast-1.compute.amazonaws.com:10016/api/syncord/updateStatus";
  public CREATE_ORDER = this.baseUrl + '/createOrder';
  public GET_MY_ORDERS = 'http://ec2-52-76-64-110.ap-southeast-1.compute.amazonaws.com:5000/hsbc';
  
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
