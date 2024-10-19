// not used actually, for dev env.development.ts is used
// and for prod. env.production.ts is used
import { Environment } from "./interface";

export const environment: Environment = {
	name: "local",
	production: false,
	useMocks: false,
	enableAnalytics: false,
	apiURL: "http://localhost:5800/v1",
};
