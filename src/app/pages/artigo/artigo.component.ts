import { Component, ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artigo',
  templateUrl: './artigo.component.html',
  styleUrls: ['./artigo.component.scss']
})
export class ArtigoComponent {

  constructor(private elementRef: ElementRef, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          this.scrollToElement(fragment);
        }, 0);
        return;
      }
    });


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
