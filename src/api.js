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