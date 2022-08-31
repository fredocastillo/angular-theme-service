import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private themeService: ThemeService){
    this.themeService.load();
  }
  title = 'DarkModeService';

  switchMode(): void {
    this.themeService.update(this.themeService.currentActive() == 'dark' ? 'light' : 'dark');
  }
}
