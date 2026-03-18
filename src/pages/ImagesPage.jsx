import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"

export default function ImagesPage(){
    const [aktivZsuri, setAktivZsuri] = useState("Összes")

    const adatok = [
        {id: 1, zsuri: "Curtis", url: "http://localhost:3000/uploads/toth_gabi.png"},
        {id: 2, zsuri: "Tóth Gabi", url: "http://localhost:3000/uploads/toth_gabi.png"},
        {id: 3, zsuri: "Marics Peti", url: "http://localhost:3000/uploads/toth_gabi.png"},
        {id: 4, zsuri: "Curtis", url: "http://localhost:3000/uploads/toth_gabi.png"},
    ]

    const zsuriLista = ["Összes", ...new Set(adatok.map(x=>x.zsuri))]

    const szurtLista = aktivZsuri === "Összes" ? adatok : adatok.filter(x=>x.zsuri===aktivZsuri)

    const [user, setUser] = useState(null)
    const nav= useNavigate();

    // kérjük le (oldalbetöltéskor) az adataimat és töltsük bele a user állapotváltoztóba!
    useEffect(() => {
        (async () => {
            const data = await adataim();
            if (data.result) {
                setUser(data.user)
            }
            else {
                // védett oldalt kivülről ne lehessen elérni
                // ha valaki nincs belépve a hőoldalra navigálunk!
                nav('/')
            }
        })()
    }, [])

    return (
        <div>
            <Navbar user={user}/>
            <div className="container mt-3">
                <div className="d-flex justify-content-between">
                    <div>
                        {
                            zsuriLista.map((zsuri)=> (
                                <button key={zsuri} className={`btn btn-sm text-nowrap ${aktivZsuri===zsuri? 'btn-light border': 'btn-white'}`} onClick={()=>setAktivZsuri(zsuri)}>{zsuri}</button>
                            ))
                        }
                    </div>
                    <div>
                        <Button content={"kép feltöltése"} color={'dark'}/>
                    </div>
                </div>
                {/*Kártyák*/}
                <div className="row g-3 mt-3">
                    {
                        szurtLista.map(adat=>(
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={adat.id}>
                                <div>
                                    <img src={adat.url} alt="kep" className="w-100" style={{height: "200px", objectFit: "cover"}}/>
                                    <div className="mt-2">
                                        <Button content={"Törlés"} color={"dark"}/>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}