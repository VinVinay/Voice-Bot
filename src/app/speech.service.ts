import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/Subject';

// TypeScript declaration for annyang
declare var annyang: any;

@Injectable()
export class SpeechService {
  errors$ = new Subject<{[key: string]: any}>();
  textField$ = new Subject<{[key: string]: any}>();
  publicationNumber$ = new Subject<string>();
  submit$ = new BehaviorSubject(false);
  listening = false;

  constructor(private zone: NgZone) {}

  get speechSupported(): boolean {
    return !!annyang;
  }

  init() {
    const commands = {
      'enter text *field': (field) => {
        this.zone.run(() => {
          this.textField$.next({'textField': field});
        });
      },
      'enter publication number *field': (field) => {
        this.zone.run(() => {
          this.publicationNumber$.next(field);
        });
      },
      'click submit': () => {
        this.zone.run(() => {
          this.submit$.next(true);
        });
      },
    };
    annyang.addCommands(commands);

    // Log anything the user says and what speech recognition thinks it might be
    // annyang.addCallback('result', (userSaid) => {
    //   console.log('User may have said:', userSaid);
    // });
    annyang.addCallback('errorNetwork', (err) => {
      this._handleError('network', 'A network error occurred.', err);
    });
    annyang.addCallback('errorPermissionBlocked', (err) => {
      this._handleError('blocked', 'Browser blocked microphone permissions.', err);
    });
    annyang.addCallback('errorPermissionDenied', (err) => {
      this._handleError('denied', 'User denied microphone permissions.', err);
    });
    annyang.addCallback('resultNoMatch', (userSaid) => {
      this._handleError(
        'no match',
        'Spoken command not recognized. Say "Enter text Oxygen". OR Enter Publication Number 1234. Or Click Submit',
        { results: userSaid });
    });
  }

  private _handleError(error, msg, errObj) {
    this.zone.run(() => {
      this.errors$.next({
        error: error,
        message: msg,
        obj: errObj
      });
    });
  }

  startListening() {
    annyang.start();
    this.listening = true;
  }

  abort() {
    annyang.abort();
    this.listening = false;
  }

}
