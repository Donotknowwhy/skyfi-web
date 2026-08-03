const TABLET_SIZE = 768;
const DESKTOP_SIZE = 1200;

export function withMobile(fn) {
  return (e) => {
    if (innerWidth >= TABLET_SIZE) return;
    e.preventDefault();
    return fn(e);
  };
}
export function withTablet(fn, other) {
  return (e) => {
    if (innerWidth >= DESKTOP_SIZE) return other?.(e);
    e.preventDefault();
    return fn(e);
  };
}
export function withoutMobile(fn, other) {
  return (...args) => {
    if (innerWidth >= TABLET_SIZE) return fn(...args);
    return other?.(...args);
  };
}

// check if the device is mobile
export function isMobile() {
  return innerWidth < TABLET_SIZE;
}

// check if the device is tablet
export function isTablet() {
  return innerWidth >= TABLET_SIZE && innerWidth < DESKTOP_SIZE;
}
// check if the device is desktop
export function isDesktop() {
  return innerWidth >= DESKTOP_SIZE;
}
