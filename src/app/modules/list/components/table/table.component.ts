import { Component } from "@angular/core";

@Component({
  selector: 'amt-table',
  template: `
  <div class="amt-table">
    <table *ngIf="mappingFiles?.length > 0 else tableLoading">
      <caption>Existing Mapping data</caption>
      <thead>
        <tr>
          <td></td>
          <th>Mapping file</th>
          <th>Last Edited</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let file of mappingFiles" [id]="'amt-list__file--'+file.id">
          <td></td>
          <td>
            <a routerLink="/mapping/new">
              {{ file.name }}
            </a>
          </td>
          <td>{{ file.lastEdited | date }}</td>
          <td>
            <button class="sds-button sds-button--icon sds-button--small">Actions <amt-icon iconType="chevron_down"></amt-icon></button>
          </td>
        </tr>
      </tbody>
    </table>

    <ng-template #tableLoading>
      Loading
    </ng-template>

  </div>`,
  styleUrls: ['./table.component.less']
})
export class TableComponent {
  mappingFiles: any[] = [
    {
      name: 'Example Mapping File',
      lastEdited: 1576758581371,
      id: 'someIdString'
    }
  ];

}
