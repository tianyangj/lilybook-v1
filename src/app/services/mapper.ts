import { IAccount } from './account.service';

export function userMapper(user: Parse.User): IAccount {
	return user ? {
		base: user,
		id: user.id,
		email: user.get('email'),
		firstname: user.get('firstname'),
		lastname: user.get('lastname')
	} : null;
}