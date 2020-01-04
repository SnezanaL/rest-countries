import { ThemeService } from './core/services/theme.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ThemeService]
})
export class AppComponent implements OnInit {
  title = 'rest-countries';
  opened: boolean;
  isDarkTheme: Observable<boolean>;

  constructor(public themeService: ThemeService) { }


  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }
}
