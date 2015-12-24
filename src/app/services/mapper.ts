import { IAccount } from './account.model';
import { IComposition } from './composition.model';
import { IComposer } from './composer.model';
import { IDifficulty } from './difficulty.model';
import { IForm } from './form.model';

export function userMapper(user: Parse.User): IAccount {
	return user ? {
		base: user,
		id: user.id,
		email: user.get('email'),
		firstname: user.get('firstname'),
		lastname: user.get('lastname')
	} : null;
}

export function compositionMapper(composition: Parse.Object): IComposition {
	return composition ? {
		base: composition,
		id: composition.id,
		title: composition.get('title'),
		description: composition.get('description'),
		vanity: composition.get('vanity'),
		catalogue: composition.get('catalogue'),
		number: composition.get('number'),
		wikipedia: composition.get('wikipedia'),
		imslp: composition.get('imslp'),
		rcm: rcmMapper(composition.get('rcm')),
		video: composition.get('video'),
		key: composition.get('key') && composition.get('key').get('name'),
		form: formMapper(composition.get('type')),
		composer: composerMapper(composition.get('composer')),
		order: composition.get('order')
	} : null;
}

export function composerMapper(composer: Parse.Object): IComposer {
	return composer ? {
		base: composer,
		id: composer.id,
		fullname: composer.get('fullName'),
		shortname: composer.get('shortName'),
		bio: composer.get('description'),
		vanity: composer.get('vanity'),
		image: composer.get('image') ? composer.get('image').url() : null
	} : null;
}

export function rcmMapper(rcm: Parse.Object): IDifficulty {
	return rcm ? {
		base: rcm,
		id: rcm.id,
		name: rcm.get('name'),
		value: rcm.get('value'),
		certificate: rcm.get('certificate')
	} : null;
}

export function formMapper(form: Parse.Object): IForm {
	return form ? {
		base: form,
		id: form.id,
		name: form.get('name'),
		description: form.get('description'),
		wiki: form.get('wiki')
	} : null;
}
