import { IComposer } from './composer.model';
import { IDifficulty } from './difficulty.model';
import { IForm } from './form.model';
import { composerMapper, rcmMapper, formMapper } from './mapper';

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
        return this.getComposers().then((composers: IComposer[]) => {
            return _.chain(composers).find((composer: IComposer) => {
                return composer.vanity === vanity;
            }).value();
        });
    }

    getFeaturedComposers(): angular.IPromise<IComposer[]> {
        return this.getComposers().then((composers: IComposer[]) => {
            return composers.filter((composer: IComposer) => {
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
            const composers = response.map(composerMapper);
            this.cache.put<IComposer[]>('composers', composers);
            defer.resolve(angular.copy(composers));
        }, (error: Parse.Error) => {
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
            const forms = response.map(formMapper);
            this.cache.put<IForm[]>('forms', forms);
            defer.resolve(angular.copy(forms));
        }, (error: Parse.Error) => {
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
            const difficulties = response.map(rcmMapper);
            this.cache.put<IDifficulty[]>('difficulties', difficulties);
            defer.resolve(angular.copy(difficulties));
        }, (error: Parse.Error) => {
            defer.reject(error);
        });
        return defer.promise;
    }
}
