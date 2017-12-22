import Node from '../Node.js';

export default class ImportDeclaration extends Node {
	bindChildren () {}

	initialiseNode () {
		this.isImportDeclaration = true;
	}

	render ( code ) {
		const excludedSpecifiers = this.specifiers.map(specifier => !this.scope.findVariable(specifier.local.name).included);
		if (excludedSpecifiers.every(Boolean) {
			code.remove( this.start, this.end ); // None of the imported variables is used => remove whole statement
		} else {
			this.specifiers.forEach((specifier, position) => {
				if (excludedSpecifiers[position]) {
					const specifierEnd = position === this.specifiers.length - 1 ? specifier.end : this.specifiers[position + 1].start;
					code.remove( this.start, specifierEnd ); // Remove this specifier + everything up to the next specifier
				}
			})
		}
	}
}
