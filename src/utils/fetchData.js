export const getData = async (url, token) => {
    const response = await fetch(process.env.REACT_APP_BASE_URL + url,{
        headers: {
            'authorization': token
        },
        credentials : "include"
    })
    const result = await response.json();
    return result
}