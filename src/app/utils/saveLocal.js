'use client';
export const saveLocal = ( key, value ) => {
  if ( typeof window !== 'undefined' ) {
	  localStorage.setItem( key, JSON.stringify( value ) );
  }
};
export const getLocal = ( key ) => {
  if ( typeof window !== 'undefined' ) {
    try {
      let value = localStorage.getItem( key );
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error(`Error parsing localStorage value for key "${key}":`, e);
      return null;
    }
  }
};
export const removeLocal = ( key ) => {
  if ( typeof window !== 'undefined' ) {
    localStorage.removeItem( key );
  }
};