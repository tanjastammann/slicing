import { writable } from "svelte/store";
import { browser } from "$app/environment";


const account = browser && localStorage.getItem('account');
export const Account = writable<JSON>(account ? JSON.parse(account) : {});

Account.subscribe(value => {
	if (browser) {
		localStorage.setItem('account', JSON.stringify(value));
	}
});

const email = browser && localStorage.getItem('email');
export const EMAIL = writable<JSON>(email ? JSON.parse(email) : {});

EMAIL.subscribe(value => {
	if (browser) {
		localStorage.setItem('email', JSON.stringify(value));
	}
});
	

const storedAuthData = browser && localStorage.getItem('isAuthenticated');
export const isAuthenticated = writable(storedAuthData ? JSON.parse(storedAuthData) : false);

isAuthenticated.subscribe(value => {
	if (browser) {
		localStorage.setItem('isAuthenticated', JSON.stringify(value));
	}
});


export async function logout() {
	let isAuth
	isAuthenticated.subscribe(val => isAuth = val)
	isAuthenticated.set(false)
	Account.set(JSON.parse("{}"))
	EMAIL.set(JSON.parse("{}"))

	alert("You are logged out!")
	window.location.href="/";
}