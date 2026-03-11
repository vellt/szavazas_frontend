const BASE = 'http://localhost:3000'

export async function regisztracio(email, felhasznalonev, jelszo){
    const res = await fetch(`${BASE}/regisztracio`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({email, felhasznalonev, jelszo, admin: 0})
    })
    const data= await res.json();
    if(!res.ok) return {result: false, message: data.message};
    else return {result: true, message: data.message};
}

export async function belepes(felhasznalonevVagyEmail, jelszo){
    const res = await fetch(`${BASE}/belepes`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({felhasznalonevVagyEmail, jelszo})
    })
    const data= await res.json();
    if(!res.ok) return {result: false, message: data.message};
    else return {result: true, message: data.message};
}

export async function adataim(){
    const res = await fetch(`${BASE}/adataim`, {
        credentials: 'include',
    })
    const data= await res.json();
    if(!res.ok) return {result: false, message: data.message};
    else return {result: true, user: data};
}

export async function kijelentkezes(){
    const res = await fetch(`${BASE}/kijelentkezes`, {
        method: 'POST',
        credentials: 'include',
    })
    const data= await res.json();
    if(!res.ok) return {result: false, message: data.message};
    else return {result: true, message: data.message};
}