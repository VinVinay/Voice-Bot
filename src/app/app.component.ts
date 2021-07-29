import { Component, OnInit } from '@angular/core';
import { DataServiceService } from './services/data-service.service';
import { SpeechService } from './speech.service';
import { voiceBotService } from './voiceBot.service';
import { ExcelService } from './excel-export.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

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
  rowData = [];

  public fetchedResult: any = [];

  constructor(
    private dataService: DataServiceService,
    private excelService: ExcelService,
    public ml: voiceBotService,
    public speech: SpeechService) {}

  ngOnInit(): void {
    this.dataService.searchedQuery.subscribe(data => {
      console.log(data);
      this.rowData = [];
      let fetchedResult = this.dataService.getPnByQuery(data);
      if(fetchedResult.length > 0) {
        
        fetchedResult.forEach((element, index) => {
          this.rowData.push({
            serialNo: index, 
            patentNumber: element.publicationNumber,
            patentTitle: element.dwpiTitle
          })
        });
      }
    })
  }

  public export() {
    //alert("you have submiited TEXT FIELD ="+ this.textField + " PUBLICATION NUMBER = " +  this.publicationNumber);
    this.excelService.generateExcel(
      this.rowData
    );
  }
  }
