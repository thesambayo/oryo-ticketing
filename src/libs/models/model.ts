export interface ApiResponse<T> {
	// pagination info
	data: T;
	error: any;
}