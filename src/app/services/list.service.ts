import { Injectable } from '@angular/core';

interface NodeParameters {
  text: string;
}

class Node {

  text: string;

  constructor( parameters: Partial<NodeParameters> ) {
    Object.keys( parameters ).forEach( key => {
      this[ key ] = parameters[ key ];
    } )
  }

}

class List {

  list: Node[];

  constructor( pre?: Node[] ) {
    this.init( pre )
  }

  init( pre? ): void {
    if ( !!pre ) {
      this.list = pre;
      return;
    }
    this.list = [ new Node( { text: 'Try writing something!' } ) ];
  }

}

@Injectable({
  providedIn: 'root'
})

export class ListService {

  constructor() {
  }

  init( pre?: Node[] ): void {
    const list = new List( pre );
    console.log( list )
  }

}
