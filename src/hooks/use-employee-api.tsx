import { Employee } from '../interfaces/employee'
import { useAuthToken } from './use-auth-token'

export const useEmployeeApi = () => {
  const { getToken } = useAuthToken()

  const getEmployeeList = async (
    companyId: string = '750'
  ): Promise<Employee[]> => {
    const url = `${process.env.VITE_API_COMPANY_URL!}companies/${companyId}/employees/`
    const token = await getToken()
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    })

    const requestOptions = {
      method: 'GET',
      headers: headers,
    }

    const response = await fetch(url, requestOptions)
    console.log(response)
    if (!response.ok) {
      throw new Error(`Status Code received: ${response.status}`)
    }

    const data = await response.json()
    return data
  }

  return { getEmployeeList }
}
