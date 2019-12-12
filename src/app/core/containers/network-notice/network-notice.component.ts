import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { Observable } from 'rxjs';

type networkStatus = "online" | "offline";

@Component({
  selector: 'amt-network-notice',
  template: `
    <div class="amt-network-notice" [ngClass]="cssClass">{{ networkStatus$ | async }}</div>
  `,
  styleUrls: ['./network-notice.component.less']
})
export class NetworkNoticeComponent implements OnInit {

  networkStatus$: Observable<networkStatus>;
  cssClass = '';

  constructor(
    private connectionService: ConnectionService
  ) {}

  ngOnInit() {
    this.networkStatus$ = new Observable(subscriber=>{
      subscriber.next('online');
      this.connectionService.monitor().subscribe(isConnected => {
        console.log(isConnected);
        if (isConnected) {
          subscriber.next('online');
        }
        else {
          subscriber.next('offline');
        }
      })
    });

    this.networkStatus$.subscribe((status) => {
      this.cssClass = 'amt-network-notice--' + status;
    });
  }

}
