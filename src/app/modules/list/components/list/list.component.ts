import { Component } from "@angular/core";

@Component({
  selector: 'amt-intro',
  template: `<div class="amt-list">
    <amt-grid>
      <div class="amt-list__top">
        <h1>Sage People &#8594; Sage Intacct API mapping</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non malesuada leo. Maecenas bibendum nulla et massa iaculis, a euismod mauris feugiat. Suspendisse quis enim dapibus, faucibus odio id, semper ligula. Cras consequat ipsum non finibus suscipit. Quisque at condimentum dui, et sollicitudin quam. Vivamus risus velit, finibus sit amet leo a, consectetur tincidunt magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vulputate fringilla elementum.</p>
        <p>Pellentesque aliquet, lectus ac suscipit volutpat, metus erat bibendum arcu, id fermentum odio libero nec lectus. Duis mollis accumsan faucibus. Morbi rhoncus est lacus, et placerat metus lobortis nec. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque rhoncus neque dui, eget commodo neque interdum sit amet. Duis et tortor ultrices, mattis ipsum ut, elementum mauris. Morbi bibendum eget velit a varius. Duis nec efficitur neque.</p>

      </div>
      <div class="amt-list__data">
        <amt-table></amt-table>
        <a class="amt-list__new" routerLink="mapping/new" href="/mapping/new"><amt-icon iconType="plus"></amt-icon> Add New</a>
      </div>
    </amt-grid>
  </div>`,
  styleUrls: ['./list.component.less']
})
export class ListComponent {}
