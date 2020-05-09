import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    images=[
      { image: "assets/images/education@2x.png" },
      { image: "assets/images/supermarket@2x.png" },
    ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onCart() {
    this.router.navigate(['dashboard/viewCart'])
  }
}
