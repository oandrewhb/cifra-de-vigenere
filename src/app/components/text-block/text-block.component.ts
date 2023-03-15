import { Component, Input  } from '@angular/core';

import { copy } from 'clipboard';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'text-block',
  templateUrl: './text-block.component.html',
  styleUrls: ['./text-block.component.scss']
})
export class TextBlockComponent {

  btnText: string = 'Copiar';
  timeOutId: any = null;

  @Input() content: string = "";
  quebrarLinha: boolean;

  constructor(private util: UtilService) {
    const quebrarLinha = this.util.getUtilCache('quebrarLinha');
    if (quebrarLinha === true) {
      this.quebrarLinha = true;
    } else if (quebrarLinha === false) {
      this.quebrarLinha = false;
    } else {
      this.quebrarLinha = true;
    }
  }

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

  onChangeQuebrarLinha() {
    setTimeout(() => {
      this.util.setUtilCache('quebrarLinha', this.quebrarLinha);
    }, 0)
  }

}
