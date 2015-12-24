import { IComposition } from './composition.model';
import { IComposer } from './composer.model';
import { compositionMapper } from './mapper';

export interface ICompositionQuery {
	composer?: IComposer,
	composerId?: string,
	formId?: string,
	difficultyId?: string,
	sortId?: number
}

export class CompositionService {

	private compositionDB: Parse.Object;
	
	/** @ngInject */
	constructor(
		private $q: angular.IQService
	) {
		this.compositionDB = Parse.Object.extend('Composition');
	}

	getComposition(compositionId: string): angular.IPromise<IComposition> {
		const defer = this.$q.defer<IComposition>();
		const query = new Parse.Query(this.compositionDB);
		query.equalTo('objectId', compositionId);
		query.include('key');
		query.include('type');
		query.include('composer');
		query.include('rcm');
		query.first().then((response: Parse.Object) => {
			if (response) {
				defer.resolve(compositionMapper(response));
			} else {
				defer.reject('NOT_FOUND');
			}
		}, (error) => {
			defer.reject(error);
		});
		return defer.promise;
	}

	getCompositions(compositionQuery: ICompositionQuery) {
		const defer = this.$q.defer<IComposition[]>();
		const query = new Parse.Query(this.compositionDB);
		query.equalTo('published', true);
		if (compositionQuery.composer) {
			query.equalTo('composer', compositionQuery.composer.base);
		}
		if (compositionQuery.composerId) {
			const composer = new Parse.Object('Composer');
			composer.id = compositionQuery.composerId;
			query.equalTo('composer', composer);
		}
		if (compositionQuery.formId) {
			const form = new Parse.Object('CompositionType');
			form.id = compositionQuery.formId;
			query.equalTo('type', form);
		}
		if (compositionQuery.difficultyId) {
			const difficulty = new Parse.Object('RCM');
			difficulty.id = compositionQuery.difficultyId;
			query.equalTo('rcm', difficulty);
		}
		query.include('key');
		query.include('type');
		query.include('composer');
		query.include('rcm');
		// sorting is done on client side
		query.ascending(['order', 'title']);
		query.find().then((response: Parse.Object[]) => {
			const compositions = response.map(compositionMapper);
			switch (compositionQuery.sortId) {
				case 2:
					compositions.sort((a, b) => {
						if (a.rcm.value < b.rcm.value) return -1;
						if (a.rcm.value > b.rcm.value) return 1;
						// otherwise sort by order
						return a.order - b.order;
					});
					break;
			}
			defer.resolve(compositions);
		}, (error) => {
			defer.reject(error);
		});
		return defer.promise;
	}
}