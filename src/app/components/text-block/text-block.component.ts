import { Component, ElementRef } from '@angular/core';

import { copy } from 'clipboard';

@Component({
  selector: 'text-block',
  templateUrl: './text-block.component.html',
  styleUrls: ['./text-block.component.scss']
})
export class TextBlockComponent {

  contentLength: number = 0;

  constructor(private el: ElementRef) {}

  copyText() {
    const content = this.el.nativeElement.querySelector('#ngContent').innerHTML.trim();
    copy(content);
    this.contentLength = content.length;
  }


}
