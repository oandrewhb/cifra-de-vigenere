import { Component, Input  } from '@angular/core';

import { copy } from 'clipboard';

@Component({
  selector: 'text-block',
  templateUrl: './text-block.component.html',
  styleUrls: ['./text-block.component.scss']
})
export class TextBlockComponent {

  btnText: string = 'Copiar';
  timeOutId: any = null;

  @Input() content: string = "";
  quebrarLinha: boolean = true;

  copyText() {
    copy(this.content);

    if (this.timeOutId) {
      clearTimeout(this.timeOutId);
    }

    this.btnText = "Copiado!";
    this.timeOutId = setTimeout(() => {
      this.btnText = "Copiar";
    }, 3000);
  }

}
