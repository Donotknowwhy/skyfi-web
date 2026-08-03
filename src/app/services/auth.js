import { post } from "./api/base";

const checkEmail = async ( email, forgot = false ) => {
	try {
		const response = await post( '/web/check-email', { email, forgot } );
		if ( response.success ) {
			return response;
		}
		throw new Error( 'Failed to check email' );

	}	catch ( error ) {
		return { success: false, message: error.message };
	}
};


const verifyCode = async ( email, code ) => {
	try {
		const response = await post( '/web/verify-active-code', { email, active_code: code } );
		if ( response.success ) {
			return response;
		}
		throw new Error( 'Failed to verify code' );

	}	catch ( error ) {

		return { success: false, message: error.message };
	}
};


const createPassword = async (params) => {
	try {
		const response = await post( '/web/create-password', params );
		if ( response.success ) {
			return response;
		}
		throw new Error( 'Failed to create password' );

	}	catch ( error ) {
		console.error( 'Error creating password:', error );
		return { success: false, message: error.message };
	}
};

const login = async ( email, password ) => {
	try {
		const response = await post( '/web/login-with-password', { email, password } );
		if ( response.success ) {
			return response;
		}
		throw new Error( 'Failed to login' );

	}	catch ( error ) {
		return { success: false, message: error.message };
	}
}
const updatePassword = async (  password ) => {
	try {
		const response = await post( '/web/update-password', {  password } );
		if ( response.success ) {
			return response;
		}
		throw new Error( 'Failed to update password' );

	}	catch ( error ) {
		console.error( 'Error updating password:', error );
		return { success: false, message: error.message };
	}
};

const loginWithSession = async ( sessionId ) => {
	try {
		const response = await post( '/app/login-with-session', { session_id: sessionId } );
		if ( response.success ) {
			return response;
		}
		throw new Error( 'Failed to login with session' );

	}	catch ( error ) {
		console.error( 'Error login with session:', error );
		return { success: false, message: error.message };
	}
};

const authService = {
	checkEmail,
	verifyCode,
	createPassword,
	updatePassword,
	login,
	loginWithSession
};

export default authService;
