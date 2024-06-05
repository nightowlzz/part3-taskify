import { api } from '@/lib/utils'

interface UploadCardImageResponse {
  imageUrl: string
}

export async function uploadCardImage(
  columnId: number,
  imageFile: File,
): Promise<UploadCardImageResponse> {
  const url = `/columns/${columnId}/card-image`
  const formData = new FormData()
  formData.append('image', imageFile)

  try {
    const response = await api.post<UploadCardImageResponse>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    throw new Error(`Failed to upload card image: ${error}`)
  }
}
