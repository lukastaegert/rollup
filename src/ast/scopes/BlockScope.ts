import { AstContext } from '../../Module';
import Identifier from '../nodes/Identifier';
import { ExpressionEntity } from '../nodes/shared/Expression';
import { UNDEFINED_EXPRESSION } from '../values';
import LocalVariable from '../variables/LocalVariable';
import ChildScope from './ChildScope';

export default class BlockScope extends ChildScope {
	addDeclaration(
		identifier: Identifier,
		context: AstContext,
		init: ExpressionEntity | null,
		isHoisted: boolean
	): LocalVariable {
		if (isHoisted) {
			this.parent.addDeclaration(identifier, context, init, isHoisted);
			// Necessary to make sure the init is deoptimized. We cannot call deoptimizePath here.
			return this.parent.addDeclaration(identifier, context, UNDEFINED_EXPRESSION, isHoisted);
		} else {
			return super.addDeclaration(identifier, context, init, false);
		}
	}
}
