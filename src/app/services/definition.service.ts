import { IComposer } from './composer.model';
import { IDifficulty } from './difficulty.model';
import { IForm } from './form.model';

export class DefinitionService {

	private cache: angular.ICacheObject;
	private composerDB: Parse.Object;
	private formDB: Parse.Object;
	private rcmDB: Parse.Object;
	
	/** @ngInject */
	constructor(
		private $q: angular.IQService,
		private $cacheFactory: angular.ICacheFactoryService
	) {
		this.cache = $cacheFactory('definition');
		this.composerDB = Parse.Object.extend('Composer');
		this.formDB = Parse.Object.extend('CompositionType');
		this.rcmDB = Parse.Object.extend('RCM');
	}

	getComposer(vanity: string): angular.IPromise<IComposer> {
		return this.getComposers().then((composers) => {
			return composers.find((composer) => {
				return composer.vanity === vanity;
			});
		});
	}

	getFeaturedComposers(): angular.IPromise<IComposer[]> {
		return this.getComposers().then((composers) => {
			return composers.filter((composer) => {
				return !!composer.image;
			});
		});
	}

	getComposers(): angular.IPromise<IComposer[]> {
		const composers = this.cache.get<IComposer[]>('composers');
		if (composers) {
			return this.$q.when(angular.copy(composers));
		}
		const defer = this.$q.defer<IComposer[]>();
		const query = new Parse.Query(this.composerDB);
		query.ascending('shortName');
		query.find().then((response: Parse.Object[]) => {
			const composers = response.map((composer): IComposer => {
				return {
					base: composer,
					id: composer.id,
					fullname: composer.get('fullName'),
					shortname: composer.get('shortName'),
					bio: composer.get('description'),
					vanity: composer.get('vanity'),
					image: composer.get('image') ? composer.get('image').url() : null
				};
			});
			this.cache.put<IComposer[]>('composers', composers);
			defer.resolve(angular.copy(composers));
		}, (error) => {
			defer.reject(error);
		});
		return defer.promise;
	}

	getForms(): angular.IPromise<IForm[]> {
		const forms = this.cache.get<IForm[]>('forms');
		if (forms) {
			return this.$q.when(angular.copy(forms));
		}
		const defer = this.$q.defer<IForm[]>();
		const query = new Parse.Query(this.formDB);
		query.ascending('order');
		query.find().then((response: Parse.Object[]) => {
			const forms = response.map((form): IForm => {
				return {
					base: form,
					id: form.id,
					name: form.get('name'),
					description: form.get('description'),
					wiki: form.get('wiki')
				};
			});
			this.cache.put<IForm[]>('forms', forms);
			defer.resolve(angular.copy(forms));
		}, (error) => {
			defer.reject(error);
		});
		return defer.promise;
	}

	getDifficulties(): angular.IPromise<IDifficulty[]> {
		const difficulties = this.cache.get<IDifficulty[]>('difficulties');
		if (difficulties) {
			return this.$q.when(angular.copy(difficulties));
		}
		const defer = this.$q.defer<IDifficulty[]>();
		const query = new Parse.Query(this.rcmDB);
		query.ascending('order');
		query.find().then((response: Parse.Object[]) => {
			const difficulties = response.map((difficulty): IDifficulty => {
				return {
					base: difficulty,
					id: difficulty.id,
					name: difficulty.get('name'),
					value: difficulty.get('value'),
					certificate: difficulty.get('certificate')
				};
			});
			this.cache.put<IDifficulty[]>('difficulties', difficulties);
			defer.resolve(angular.copy(difficulties));
		}, (error) => {
			defer.reject(error);
		});
		return defer.promise;
	}
}