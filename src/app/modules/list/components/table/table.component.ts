import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as fromModels from 'src/app/models';

@Component({
  selector: 'amt-table',
  template: `
  <div class="amt-table">
    <table>
      <caption class="h3">Exported Mapping Data</caption>
      <thead>
        <tr>
          <th class="name">Mapping file</th>
          <th>Last Edited</th>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let file of mappingFiles" [id]="'amt-list__file--'+file.id">
          <td class="name">
            <a routerLink="/mapping/{{ file.id }}">
              {{ file.name }}
            </a>
          </td>
          <td>{{ file.lastUpdated | date }}</td>
          <td>
            <amt-actions label="Actions">
              <button (click)="handleAction(file.id, 'edit')" class="sds-button sds-button--small">Edit</button>
              <button (click)="handleAction(file.id, 'download')" class="sds-button sds-button--small">Download</button>
              <button (click)="handleAction(file.id, 'delete')" class="sds-button sds-button--small sds-button--destructive">Delete</button>
            </amt-actions>
          </td>
        </tr>
      </tbody>
    </table>
  </div>`,
  styleUrls: ['./table.component.less']
})
export class TableComponent {

  @Input() mappingFiles: fromModels.StorageDataFormat[] = [];

  @Output() action: EventEmitter<[string, string]> = new EventEmitter();

  handleAction(id:string, action:string):void {
    this.action.emit([id, action]);
  }
}
