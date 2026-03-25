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

export async function emailModositas(ujEmail){
    console.log(ujEmail);
    const res = await fetch(`${BASE}/email`, {
        method: 'PUT',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ujEmail})
    })
    const data = await res.json();
    if(!res.ok) return {result: false, message: data.message};
    else return {result: true, message: data.message};
}

export async function felhasznalonevModositas(ujFelhasznalonev){
    const res = await fetch(`${BASE}/felhasznalonev`, {
        method: 'PUT',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ujFelhasznalonev})
    })
    const data = await res.json();
    if(!res.ok) return {result: false, message: data.message};
    else return {result: true, message: data.message};
}

export async function jelszoModositas(jelenlegiJelszo, ujJelszo){
    const res = await fetch(`${BASE}/jelszo`, {
        method: 'PUT',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({jelenlegiJelszo, ujJelszo})
    })
    const data = await res.json();
    if(!res.ok) return {result: false, message: data.message};
    else return {result: true, message: data.message};
}

export async function fiokTorlese(){
    const res = await fetch(`${BASE}/fiokom`, {
        method: 'DELETE',
        credentials: 'include',
    })
    const data = await res.json();
    if(!res.ok) return {result: false, message: data.message};
    else return {result: true, message: data.message};
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

export async function kepFeltoltes(file, zsuri){
    const formData = new FormData();
    formData.append('kep_neve',file);
    formData.append('zsuri_id',parseInt(zsuri));
    const res = await fetch(`${BASE}/kepek`, {
        method: 'POST',
        credentials: 'include',
        body: formData
    })
    const data= await res.json();
    if(!res.ok) return {result: false, message: data.message};
    else return {result: true, message: data.message};
}

export async function kepekLekerese(){
    const res = await fetch(`${BASE}/kepek`, {
        credentials: 'include'
    });
    const data= await res.json();
    if(!res.ok) return {result: false, message: data.message};
    else return {result: true, images: data};
}

export async function kepTorlese(kep_neve){
    const res = await fetch(`${BASE}/kepek`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({kep_neve})
    })
    const data = await res.json();
    if(!res.ok) return {result: false, message: data.message};
    else return {result: true, message: data.message};
}

export async function szavazatokLekerese(){
    const res = await fetch(`${BASE}/szavazatok`);
    const data= await res.json();
    if(!res.ok) return {result: false, message: data.message};
    else return {result: true, szavazatok: data};
}

export async function szavazatLeadasa(zsuri_id){
    const res = await fetch(`${BASE}/szavazas/${zsuri_id}`, {
        method: 'POST',
        credentials: 'include',
    })
    const data= await res.json();
    if(!res.ok) return {result: false, message: data.message};
    else return {result: true, message: data.message};
}

export async function gyoztesLekerese(){
    const res = await fetch(`${BASE}/gyoztes`);
    const data= await res.json();
    if(!res.ok) return {result: false, message: data.message};
    else return {result: true, gyoztes: data};
}

export async function felhasznalokLekerese(){
    const res = await fetch(`${BASE}/felhasznalok`, {
        credentials: 'include'
    });
    const data= await res.json();
    if(!res.ok) return {result: false, message: data.message};
    else return {result: true, felhasznalok: data};
}