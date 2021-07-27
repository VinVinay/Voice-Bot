import { Component } from '@angular/core';
import { SpeechService } from './speech.service';
import { voiceBotService } from './voiceBot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  rowIndex: number = 0;
  columnDefs = [
    {headerName: ' ', field: 'patentCheckBox', width: 50,  cellRenderer: function(params: any) { 
      var input = document.createElement('input');
      input.type="checkbox";
      input.checked=params.value;
      input.addEventListener('click', function (event) {
          params.value=!params.value;
          params.node.data.fieldName = params.value;
      });
      return input;
  }},
    {headerName: 'Sl. No.', field: 'serialNo', width: 60},
    {headerName: 'Patent Number', field: 'patentNumber', width: 200},
    {headerName: 'Title', field: 'patentTitle', wrapText: true, width: 780, autoHeight: true,}
  ];
  defaultColDef = {
    sortable: true,
  };
  rowData = [
      {serialNo: this.rowIndex++, patentNumber: 'JP05144996B2', patentTitle: 'The manufacturing method of the photosensitive The manufacturing method of the photosensitive The manufacturing method of the photosensitive The manufacturing method of the photosensitive'},
      {serialNo: this.rowIndex++, patentNumber: 'EP1493783A1', patentTitle: 'Pigment dispersant for non-aqueous solvent, ink '},
      {serialNo: this.rowIndex++, patentNumber: 'CN101144992A', patentTitle: 'Oil-based ink comparticles, specific polys solvent'}
  ];

  constructor(
    public ml: voiceBotService,
    public speech: SpeechService) {}
}
