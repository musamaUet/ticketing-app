declare module '@mu_tickets/common';
declare module globalThis {
	var signin: () => Promise<string[]>;
}
