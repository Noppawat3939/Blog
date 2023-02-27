import axios from 'axios'

type serviceType = {
    endpoint: string
    payload?: any
    authorize?: string
    method: 'POST' | 'PUT' | 'GET' | 'DELETE'
}

export const service = async ({
    method,
    endpoint,
    payload = {},
    authorize,
}: serviceType) => {
    if (method === 'POST') {
        try {
            const response = await axios.post(endpoint, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authorize,
                },
            })

            return {
                headers: response.headers,
                body: response.data,
                status: response.status,
            }
        } catch (error: unknown) {
            console.error('error =>', error)
            return
        }
    } else if (method === 'PUT') {
        try {
            const response = await axios.put(endpoint, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authorize,
                },
            })

            return {
                headers: response.headers,
                body: response.data,
                status: response.status,
            }
        } catch (error: unknown) {
            console.error(error)
            return
        }
    } else if (method === 'DELETE') {
        try {
            const response = await axios.delete(endpoint, payload)

            return {
                headers: response.headers,
                body: response.data,
                status: response.status,
            }
        } catch (error: unknown) {
            console.error(error)
            return
        }
    } else {
        return
    }
}
