export interface ApiResponse<T> {
	// pagination info
	data: T;
	error: any;
	metadata?: {
		current_page: number;
		page_size: number;
		first_page: number;
		last_page: number;
		total_records: number;
	};
}
