export interface Environment {
	name: string;
	production: boolean;
	enableAnalytics: boolean;
	useMocks: boolean;
	apiURL: string;
}