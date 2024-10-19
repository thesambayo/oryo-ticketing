// not used actually, for dev env.development.ts is used
// and for prod. env.production.ts is used
import { Environment } from "./interface";

export const environment: Environment = {
	name: "mock",
	production: false,
	useMocks: true,
	enableAnalytics: false,
	apiURL: "https://api-operations-staging.oryoltd.org/v1",
};
