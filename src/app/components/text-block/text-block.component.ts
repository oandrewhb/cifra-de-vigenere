import { Component, Input  } from '@angular/core';

import { copy } from 'clipboard';

@Component({
  selector: 'text-block',
  templateUrl: './text-block.component.html',
  styleUrls: ['./text-block.component.scss']
})
export class TextBlockComponent {

  @Input() content: string = "";
  quebrarLinha: boolean = true;

  copyText() {
    copy(this.content);
  }

}
