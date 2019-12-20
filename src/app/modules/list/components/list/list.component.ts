import { Component, OnInit, OnDestroy } from "@angular/core";
import { StorageService } from 'src/app/services/storage.service';
import { Observable, Subscription } from 'rxjs';
import * as fromModels from 'src/app/models';

@Component({
  selector: 'amt-intro',
  template: `<div class="amt-list">
    <amt-grid>
      <div class="amt-list__top">
        <h1>Sage People &#8594; Sage Intacct API mapping</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non malesuada leo. Maecenas bibendum nulla et massa iaculis, a euismod mauris feugiat. Suspendisse quis enim dapibus, faucibus odio id, semper ligula. Cras consequat ipsum non finibus suscipit. Quisque at condimentum dui, et sollicitudin quam. Vivamus risus velit, finibus sit amet leo a, consectetur tincidunt magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div class="amt-list__data">
        <ng-container *ngIf="!loading else loadingData">
          <amt-table [mappingFiles]="tableData$ | async" (action)="handleAction($event)"></amt-table>
          <a
            class="amt-list__new"
            routerLink="mapping/new"
            href="/mapping/new"
          ><amt-icon iconType="plus"></amt-icon> Add New</a>
        </ng-container>
        <ng-template #loadingData>
          <amt-loading></amt-loading>
        </ng-template>
      </div>
    </amt-grid>
  </div>`,
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit, OnDestroy {

  constructor(
    private storageService: StorageService
  ) {}

  loading = true;
  tableData$: Observable<fromModels.StorageDataFormat[]>;
  sub: Subscription;

  ngOnInit(): void {
    this.tableData$ = this.storageService.getAllMappingFiles();
    this.sub = this.tableData$.subscribe( _ => {
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  handleAction([id, action]){
    console.log(id, action);
  }
}
