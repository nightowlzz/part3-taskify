import { api } from '@/lib/utils'

interface UpdateColumnResponse {
	id: number;
	title: string;
	teamId: string;
	createdAt: string;
	updatedAt: string;
  }
  
  export async function updateColumn(columnId: number, title: string): Promise<UpdateColumnResponse> {
	const url = `/columns/${columnId}`;
	const requestBody = { title };
  
	try {
	  const response = await api.put<UpdateColumnResponse>(url, requestBody);
	  return response.data;
	} catch (error) {
	  throw new Error(`Failed to update column: ${error}`);
	}
  }
  