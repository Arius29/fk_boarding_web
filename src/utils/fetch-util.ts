export const fetchApi = async <T>(
  url: string,
  method: string,
  body: T
  //token?: string
) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${token}`,
  })

  const requestOptions = {
    method: method,
    headers: headers,
    body: body && JSON.stringify(body),
  }

  const response = await fetch(url, requestOptions)
  if (!response.ok) {
    throw new Error(`Status Code received: ${response.status}`)
  }
  const data = await response.json()
  return data.result
}
