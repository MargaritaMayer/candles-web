import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./contacts.component.less']
})
export class ContactsComponent implements OnInit{
  constructor(
    private router: Router) {};
  ngOnInit(): void {
  }

}
