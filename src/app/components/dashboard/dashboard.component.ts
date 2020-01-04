import { ThemeService } from './../../core/services/theme.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isDarkTheme: Observable<boolean>;

  constructor(
    public authService: AuthService,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

}
