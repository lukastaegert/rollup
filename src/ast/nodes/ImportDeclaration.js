import Node from '../Node.js';

export default class ImportDeclaration extends Node {
	bindChildren () {}

	initialiseNode () {
		this.isImportDeclaration = true;
	}

	render ( code ) {
		if (!this.included) {
			code.remove( this.start, this.next || this.end );
		}
	}
}
