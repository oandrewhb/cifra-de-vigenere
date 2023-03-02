import { Component, ElementRef  } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-artigo',
  templateUrl: './artigo.component.html',
  styleUrls: ['./artigo.component.scss']
})
export class ArtigoComponent {

  constructor(private elementRef: ElementRef, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        
        const topicoId = event.url.split('#')[1] ?? '';
        if (topicoId) {
          this.scrollToElement(topicoId)
        }

      }
    });
  }

  scrollToElement(elementId: string): void {
    const meuElemento = this.elementRef.nativeElement.querySelector(`#${elementId}`);
    if (meuElemento) {
      meuElemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

}
