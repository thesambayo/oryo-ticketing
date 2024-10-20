import { provideZoneChangeDetection } from '@angular/core';
import {
	Routes,
	provideRouter,
	withInMemoryScrolling,
	withRouterConfig,
} from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { errorsInterceptor } from './interceptors/errors.interceptor';

export interface CoreOptions {
	routes: Routes;
}

export function provideCore({ routes }: CoreOptions) {
	return [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(
			routes,
			withRouterConfig({
				onSameUrlNavigation: 'reload',
			}),
			// withComponentInputBinding(),
			withInMemoryScrolling({
				anchorScrolling: 'enabled',
				scrollPositionRestoration: 'enabled',
			}),
		),
		provideHttpClient(
			withInterceptors([authInterceptor, errorsInterceptor]),
		),

		// other 3rd party libraries providers like NgRx, provideStore()

		// other application specific providers and setup

		// perform initialization, has to be last
		// {
		//   provide: ENVIRONMENT_INITIALIZER,
		//   multi: true,
		//   useValue() {
		//     // add init logic here...
		//     // kickstart processes, trigger initial requests or actions, ...
		//   },
		// },
	];
}
