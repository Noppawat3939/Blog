const BASE_URL = import.meta.env.VITE_BASE_URL
// const BASE_URL = 'https://blog-server-phi.vercel.app'

export const ENDPOINT = {
    LOGIN: `${BASE_URL}/api/login`,
    REGISTER: `${BASE_URL}/api/register`,
    ME: `${BASE_URL}/api/me`,
    UPDATE_PROFILE: `${BASE_URL}/api/update-profile`,
    CREATE_BLOG: `${BASE_URL}/api/create-blog`,
    GET_BLOG: `${BASE_URL}/api/get-my-blog`,
    DELETE_BLOG: `${BASE_URL}/api/delete-blog`,
    GET_ID_BLOG: `${BASE_URL}/api/get-blog`,
    EDIT_BLOG: `${BASE_URL}/api/edit-blog`,
}
