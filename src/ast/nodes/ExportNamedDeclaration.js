import Node from '../Node.js';

export default class ExportNamedDeclaration extends Node {
	bindChildren () {
		// Do not bind specifiers
		if ( this.declaration ) this.declaration.bind();
	}

	hasEffects ( options ) {
		return this.declaration && this.declaration.hasEffects( options );
	}

	initialiseNode () {
		this.isExportDeclaration = true;
	}

	render ( code, es ) {
		if ( this.declaration ) {
			if (!this.included) {
				code.remove( this.start, this.end );
			} else {
				this.declaration.render( code, es );
			}
		} else if (!this.source) {
			// this is the "export {x, y as z}" case; we're only handling non-reexports for now
			this.specifiers.forEach((specifier, position) => {
				if (!this.scope.findVariable(specifier.local.name).included) {
					const specifierEnd = position === specifiers.length - 1 ? specifier.end : specifiers[position + 1].start;
					code.remove(specifier.start, specifierEnd);
				}
			})
		}
	}
}
