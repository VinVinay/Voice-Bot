import { Component, OnInit, OnDestroy } from '@angular/core';
import { Words } from './../words';
import { SpeechService } from './../speech.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-listen',
  templateUrl: './listen.component.html',
  styleUrls: ['./listen.component.scss']
})
export class ListenComponent implements OnInit, OnDestroy {
  nouns: string[] = new Words().array;
  verbs: string[] = new Words().array;
  adjs: string[] = new Words().array;
  nounSub: Subscription;
  verbSub: Subscription;
  adjSub: Subscription;
  arrayFull: string;
  errorsSub: Subscription;
  errorMsg: string;
  textField: string;
  patentCollections : string;
  publicationNumber: string;


  constructor(public speech: SpeechService) { }

  ngOnInit() {
    this.speech.init();
    // this._listenNouns();
    // this._listenVerbs();
    // this._listenAdj();
    this._listenErrors();
    this._listentextField();
    this._listenPublicationNumber();
    this._listenSubmit();
  }

  get btnLabel(): string {
    return this.speech.listening ? 'Listening...' : 'Listen';
  }

  private _listentextField(){
     this.speech.textField$.subscribe((item :any)=>{
       console.log(item)
       this._setError();
      this.textField = item.textField
    })
  }

  private _listenPublicationNumber(){
    this.speech.publicationNumber$.subscribe((item :any)=>{
      console.log(item)
      this._setError();
     this.publicationNumber = item
   })
 }

 private _listenSubmit(){
  this.speech.submit$.subscribe((item :any)=>{
    console.log(item)
    this._setError();
    if(item){
      this.submitForm()
    }
  
 })
}


 public submitForm() {
   alert("you have submiited TEXT FIELD ="+ this.textField + " PUBLICATION NUMBER = " +  this.publicationNumber);
 }

  // private _listenNouns() {
  //   this.nounSub = this.speech.words$
  //     .filter(obj => obj.type === 'noun')
  //     .map(nounObj => nounObj.word)
  //     .subscribe(
  //       noun => {
  //         this._setError();
  //         this.nouns = this._updateWords('nouns', this.nouns, noun);
  //       }
  //     );
  // }



  private _listenErrors() {
    this.errorsSub = this.speech.errors$
      .subscribe(err => this._setError(err));
  }

  private _setError(err?: any) {
    if (err) {
      console.log('Speech Recognition:', err);
      this.errorMsg = err.message;
    } else {
      this.errorMsg = null;
    }
  }

  ngOnDestroy() {
    this.errorsSub.unsubscribe();
  }

}
