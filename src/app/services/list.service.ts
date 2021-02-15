import { Injectable } from '@angular/core';

interface NodeParameters {
  text: string;
}

class Node {

  text: string | undefined = undefined;
  previous: Node | undefined = undefined;
  next: Node | undefined = undefined;
  child: Node | undefined = undefined;

  constructor( parameters?: Partial<NodeParameters> ) {
    if ( !parameters ) return;

    Object.keys( parameters ).forEach( key => {
      this[ key ] = parameters[ key ];
    } )
  }

  setPrevious( node: Node ): Node {
    this.previous = node;
    node.next = this;
    return node;
  }

  setNext( node: Node ): Node {
    this.next = node;
    node.previous = this;
    return node;
  }

}

class List {

  head: Node = undefined;
  list: Node[] = undefined;

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

  append( node: Node ): Node {
    const previousNode = this.list[ this.list.length - 1 ];
    previousNode.setNext( node );
    node.setPrevious( previousNode );
    this.list.push( node );
    this.head = node;
    return node;
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
    console.log( list );
    const newNode = new Node();
    list.append( newNode );
    console.log( list );
  }

}
