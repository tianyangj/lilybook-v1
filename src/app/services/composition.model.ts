import { IComposer } from './composer.model';
import { IDifficulty } from './difficulty.model';
import { IForm } from './form.model';

export interface IComposition {
	base: Parse.Object,
	id: string,
	title: string,
	description: string,
	vanity: string,
	catalogue: string,
	number: number,
	key: string,
	form: IForm,
	wikipedia: string,
	imslp: string,
	order: number,
	composer: IComposer,
	rcm?: IDifficulty,
	video: string
}