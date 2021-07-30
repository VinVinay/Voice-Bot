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
    {headerName: ' ', field: 'checked', width: 40,  cellRenderer: function(params: any) { 
      var input = document.createElement('input');
      input.type="checkbox";
      input.checked=params.value;
      input.addEventListener('click', function (event) {
          params.value=!params.value;
          params.node.data.fieldName = params.value;
      });
      return input;
  }},
    {headerName: 'Patent Number', field: 'patentNumber', width: 200},
    {headerName: 'Title', field: 'patentTitle', wrapText: true, width: 300, autoHeight: true },
    {headerName: 'DWPI Title', field: 'dwpiTitle', wrapText: true, width: 540, autoHeight: true }
  ];
  defaultColDef = {
    sortable: true,
  };
  rowData = [];
  public loader: boolean = false;
  public fetchedResult: any = [];
  public listening: boolean;

  constructor(
    private dataService: DataServiceService,
    private excelService: ExcelService,
    public ml: voiceBotService,
    public speech: SpeechService) {}

  ngOnInit(): void {
    this.dataService.searchedQuery.subscribe(data => {
      console.log(data);
      if(data.text !== ''){
        let fetchedResult = this.dataService.searchedData = this.dataService.getPnByQuery(data);
        this.loader = true;
        setTimeout(() => {
          this.loader = false;
          this.addDataToRow(fetchedResult);
        }, 1000);
      }
    });

    this.dataService.updateRowData.subscribe(data=>{
      this.addDataToRow(data);
    });

    this.speech.clickOnExport$.subscribe(data=>{
      if(data){
        this.export();
        this.speech.clickOnExport$.next(false);
      }
    });
  }

  public addDataToRow(data:any) {
    if(data.length) {
      this.rowData = [];
      data.forEach((element, index) => {
        this.rowData.push({
          checked : element.checked,
          serialNo: index + 1, 
          patentNumber: element.publicationNumber,
          patentTitle: element.title,
          dwpiTitle: element.dwpiTitle
        })
      });
    }
  }

  public export() {
    //alert("you have submiited TEXT FIELD ="+ this.textField + " PUBLICATION NUMBER = " +  this.publicationNumber);
    this.excelService.generateExcel(
      this.rowData
    );
  }

  public toggleClick(data) {
    this.listening = !this.listening;
    if(this.listening) {
      this.speech.startListening();
    } else {
      this.speech.abort();
    }
    
  }
}
