import { Component } from '@angular/core';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent {

  loaded: boolean = false;
  lastLoad: string = '';
  commitsArray: any[] = [];
  errorMsg: string = '';

  constructor(private util: UtilService) {
    this.util.getProjectCommits((commitsArray, lastLoad) => {
      this.commitsArray = commitsArray;
      this.lastLoad = lastLoad;
      this.loaded = true;
    }, (errMsg) => {
      this.errorMsg = errMsg;
      this.loaded = true;
    });
  }

}