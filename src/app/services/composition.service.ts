import { IComposition } from './composition.model';
import { IComposer } from './composer.model';
import { composerMapper, compositionMapper } from './mapper';

export interface ICompositionQuery {
    composer?: IComposer;
    composerId?: string;
    formId?: string;
    difficultyId?: string;
    sortId?: number;
}

export class CompositionService {

    private composerDB: Parse.Object;
    private compositionDB: Parse.Object;

    /** @ngInject */
    constructor(
        private $q: angular.IQService
    ) {
        this.composerDB = Parse.Object.extend('Composer');
        this.compositionDB = Parse.Object.extend('Composition');
    }

    getComposer(vanity: string): angular.IPromise<IComposer> {
        const defer = this.$q.defer<IComposer>();
        const query = new Parse.Query(this.composerDB);
        query.equalTo('vanity', vanity);
        query.first().then((response: Parse.Object) => {
            if (response) {
                defer.resolve(composerMapper(response));
            } else {
                defer.reject('NOT_FOUND');
            }
        }, (error: Parse.Error) => {
            defer.reject(error);
        });
        return defer.promise;
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
        }, (error: Parse.Error) => {
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
                    compositions.sort((a: IComposition, b: IComposition) => {
                        if (a.rcm.value < b.rcm.value) {
                            return -1;
                        }
                        if (a.rcm.value > b.rcm.value) {
                            return 1;
                        }
                        // otherwise sort by order
                        return a.order - b.order;
                    });
                    break;
            }
            defer.resolve(compositions);
        }, (error: Parse.Error) => {
            defer.reject(error);
        });
        return defer.promise;
    }
}
