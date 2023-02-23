import { Component } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cifra-de-vigenere';

  currentRoute: string = "";

  pageTitles: {[key: string]: string} = {
    "/": "",
    "/documentacao": "Documentação"
  };

  constructor(private router: Router, private titleService: Title) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        this.setPageTitle(this.pageTitles[event.url]);
      }
    });
  }

  setPageTitle(title: string): void {
    const mainTitle: string = "Cifra De Vigenère"

    if (title.trim() != "") {
      this.titleService.setTitle(`${mainTitle} | ${title}`)
      return
    }

    this.titleService.setTitle(mainTitle)
  }
}
