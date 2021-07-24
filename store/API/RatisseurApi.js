
import React, { useEffect, useState } from "react";

const API_PATH = "http://192.168.1.196:8000";
const API_LOCAL = API_PATH + "/api/v1/";


export const API_IMG_SKILL = (ImageName) => {
    return { uri: API_PATH + "/images/skill/" + ImageName };
}


export function post() {
    return fetch(API_LOCAL + 'produit', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "type": "select",
            "args": {
                "table": "author",
                "columns": [
                    "name"
                ],
                "limit": "1"
            }
        })
    })
        .then((response) => response.json())
        .catch((error) => console.log(error.message))
}


export function login_ckeck(data) {
    return fetch(API_LOCAL + 'login_check', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": data.username,
            "password": data.password,
        })
    })
        .then((response) => response.json())
        .catch((error) => console.log(error.message))
}


export function register(data) {
    return fetch(API_LOCAL + 'register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": data.email,
            "phone": data.phone,
            "password": data.password,
        })
    })
        .then((response) => response.json())
        .catch((error) => console.log(error.message))
}


export function putUserCompte(data, TOKEN_SECURITY) {
    return fetch(API_LOCAL + 'admin/security', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'BEARER ' + TOKEN_SECURITY,
        },
        body: JSON.stringify({
            "password": data.password,
            "newPassword": data.newPassword,
        })
    })
        .then((response) => response.json())
        .catch((error) => console.log(error.message))
}


export function deleteUserCompte(data, TOKEN_SECURITY) {
    return fetch(API_LOCAL + 'admin/security', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'BEARER ' + TOKEN_SECURITY,
        },
        body: JSON.stringify({
            "password": data.password,
        })
    })
        .then((response) => response.json())
        .catch((error) => console.log(error.message))
}


export function putUserIdentity(data, TOKEN_SECURITY, id) {
    return fetch(API_LOCAL + 'admin/identify/' + id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'BEARER ' + TOKEN_SECURITY,
        },
        body: JSON.stringify({
            "name": data.name,
            "sexe": data.sexe,
            "brithday": data.brithday,
        })
    })
        .then((response) => response.json())
        .catch((error) => console.log(error.message))
}


export function postUserIdentity(data, TOKEN_SECURITY) {
    return fetch(API_LOCAL + 'admin/identify', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'BEARER ' + TOKEN_SECURITY,
        },
        body: JSON.stringify({
            "name": data.name,
            "sexe": data.sexe,
            "brithday": data.brithday,
        })
    })
        .then((response) => response.json())
        .catch((error) => console.log(error.message))
}


export function postUserSkill(data, TOKEN_SECURITY) {

    return fetch(API_LOCAL + 'admin/skills', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data; ',
            'Authorization': 'BEARER ' + TOKEN_SECURITY,
        },
        body: data
    })
        .then((response) => response.json())
        .catch((error) => console.log(error.message))

}


export function getUserSkill(TOKEN_SECURITY, userId) {

    return fetch(API_LOCAL + 'admin/skills', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'BEARER ' + TOKEN_SECURITY,
        }
    })
        .then((response) => response.json())
        .catch((error) => console.log(error.message))
}


export function getSkills(TOKEN_SECURITY) {
    return useFetch('skills', 'GET', TOKEN_SECURITY)
}


export function getSkillsByUserId(userId, TOKEN_SECURITY) {
    const [state, dispatch] = useContext(Context)
    return [loading, response] = useFetch('admin/skills/' + userId, 'GET', TOKEN_SECURITY)
}







export function getUser(TOKEN_SECURITY, Context, data) {
    const [state, dispatch] = useContext(Context)
    const [loading, response] = useFetch('admin/security/', 'GET', TOKEN_SECURITY, data)

    useEffect(() => {
        (async () => {
            if (loading == true) {
                if (response.status == 200) {
                    await dispatch({ type: 'ADD_COMPTE', payload: { api_key: TOKEN_SECURITY, id: response.data.id } })
                }
            }
        })()
    }, [loading])

    return [loading, response]
}


export function useFetch(url, methode, TOKEN_SECURITY, data) {

    const API_LOCAL = "http://192.168.1.78:8000/api/v1/"

    const [state, setState] = useState({
        response: [],
        loading: true,
    })

    useEffect(() => {
        (async function () {
            const responseFetch = await fetch(API_LOCAL + url, {
                method: methode,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'BEARER ' + TOKEN_SECURITY,
                },
                body: JSON.stringify(data)
            })

            const responseData = await responseFetch.json();

            if (responseFetch.ok) {
                setState({
                    response: responseData,
                    loading: false,
                })
            } else {
                alert(JSON.stringify(responseData))
                setState(state => ({ ...state, loading: false }))
            }

        })()

    }, [])

    return [state.loading, state.response]
}






















/*








export function checkLogin(data, Context) {
    const [loading, response] = useFetch('login_check', 'POST', '', data)
    const [state, setState] = useState({
        response: [],
        loading: true,
    });

    useEffect(() => {
        if (loading == true) {
            if (response.token !== undefined) {
                (async () => {
                    const [loadinggetUser, responsegetUser] = await getUser(response.token, Context, { password: data.password })
                    if (loadinggetUser == true) {
                        setState(
                            {
                                loading:false,
                                response: responsegetUser
                            }
                        )
                    }
                })()
            } else {
                setState(
                    {
                        loading:false,
                        response: response
                    }
                )
            }
        } else {
            setState(state => ({ ...state, loading: false }))
        }
    }, [loading])

    return [state.loading, state.response]
}
*/