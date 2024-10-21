import { of } from "rxjs";
import { map, delay, mergeMap } from "rxjs/operators";

// Utility helper that all mock services use for their responses so we can do things to all of them
// from one place (e.g. add a delay to simulate network latency). Note: clients must provide a
// `makeRequest` function instead of just the response payload so that any mutations performed by
// the request (e.g. deleting an access) are only carried out when this helper method asks them to.
export const mockResponse = <T>(makeRequest: () => T, delayInMs?: number) =>
	// Invoke makeRequest inside an Observable chain so errors can be handled by subscribers
	// (vs preventing the chain from getting created at all).
	of(null).pipe(
		mergeMap((value) => (delayInMs ? of(value).pipe(delay(delayInMs)) : of(value))),
		map(() => makeRequest())
	);
