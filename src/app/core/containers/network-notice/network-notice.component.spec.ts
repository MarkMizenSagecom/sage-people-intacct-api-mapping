import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { NetworkNoticeComponent } from './network-notice.component';
import { ConnectionService } from 'ng-connection-service';
import { of } from 'rxjs';

describe('NetworkNoticeComponent', () => {
  let fixture: ComponentFixture<NetworkNoticeComponent>;
  let service: ConnectionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConnectionService,
          useValue: {
            monitor: () => of(true)
          }
        },
      ],
      declarations: [
        NetworkNoticeComponent
      ],
    }).compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(NetworkNoticeComponent);
      service = TestBed.get(ConnectionService);
    });
  }));

  it('should have online class when service responds with true', () => {
    spyOn(service, 'monitor').and.returnValue(of(true));
    fixture.detectChanges();
    expect(fixture.componentInstance.cssClass).toBe('amt-network-notice--online');
  });

  it('should have offline class when service responds with false', () => {
    spyOn(service, 'monitor').and.returnValue(of(false));
    fixture.detectChanges();
    expect(fixture.componentInstance.cssClass).toBe('amt-network-notice--offline');
  });

});
