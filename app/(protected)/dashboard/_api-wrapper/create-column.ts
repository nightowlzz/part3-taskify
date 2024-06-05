import { api } from '@/lib/utils'

interface CreateColumnResponse {
	id: number;
	title: string;
	teamId: string;
	createdAt: string;
	updatedAt: string;
  }
  
  export async function createColumn(title: string, dashboardId: number): Promise<CreateColumnResponse> {
	const url = `/columns`;
	const requestBody = { title, dashboardId };
  
	try {
	  const response = await api.post<CreateColumnResponse>(url, requestBody);
	  return response.data;
	} catch (error) {
	  throw new Error(`Failed to create column: ${error}`);
	}
  }
  