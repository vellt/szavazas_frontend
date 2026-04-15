import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
import { BASE, adataim, kepTorlese, kepekLekerese } from "../api"
import Modal from "../components/Modal"

export default function ImagesPage(){
    const [aktivZsuri, setAktivZsuri] = useState("Összes")

    const [adatok, setAdatok] = useState([])
    const zsuriLista = ["Összes", ...new Set(adatok.map(x=>x.zsuri))]
    const szurtLista = aktivZsuri === "Összes" ? adatok : adatok.filter(x=>x.zsuri===aktivZsuri)
    const [user, setUser] = useState(null)
    const nav= useNavigate();

    // kép törlése modal
    const [torlesOpen, setTorlesOpen] = useState(false);
    const [torlesHiba, setTorlesHiba] = useState("")
    const [torlesKep, setTorlesKep] = useState("")

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
                //alert('Ezt az oldalt nem éred el, mert nem vagy bejelentkezve!')
            }
        })();
        (async()=>{
            const data = await kepekLekerese();
            if(data.result){
                setAdatok(data.images)
            }
        })()
    }, [])

    return (
        <div>
            <Navbar user={user}/>
            <div className="container my-3">
                <div className="d-flex justify-content-between">
                    <div>
                        {
                            zsuriLista.map((zsuri)=> (
                                <button key={zsuri} className={`btn btn-sm text-nowrap ${aktivZsuri===zsuri? 'btn-light border': 'btn-white'}`} onClick={()=>setAktivZsuri(zsuri)}>{zsuri}</button>
                            ))
                        }
                    </div>
                    <div>
                        <Button content={"kép feltöltése"} color={'dark'} onClick={()=>nav('/upload')}/>
                    </div>
                </div>
                {/*Kártyák*/}
                <div className="row g-3 mt-3">
                    {
                        szurtLista.map(adat=>(
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={adat.kep_neve}>
                                <div>
                                    <img src={`${BASE}/uploads/${adat.kep_neve}`} alt="kep" className="w-100" style={{height: "200px", objectFit: "cover"}}/>
                                    <div className="mt-2">
                                        <Button content={"Törlés"} color={"dark"} onClick={()=>{
                                            setTorlesKep(adat.kep_neve)
                                            setTorlesOpen(true)
                                        }}/>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <Modal open={torlesOpen} title={"Kép törlése"} color={'danger'} onClose={() => setTorlesOpen(false)} submitText={"Törlés"} onSubmit={() => {
                    (async () => {
                        const data = await kepTorlese(torlesKep);
                        if(data.result){
                            setTorlesHiba('');
                            setTorlesOpen(false);
                            // ha sikeres a törlés, betöltöm a képeket
                            const data = await kepekLekerese();
                            if(data.result){
                                setAdatok(data.images)
                            }
                        }
                        else{
                            setTorlesHiba(data.message);
                        }
                    })()
                }}>
                    {torlesHiba && (<div className="alert alert-danger" role="alert">{torlesHiba}</div>)}
                    Gondolt át nagyon a döntésedet! A művelet nem vonható vissza!
                </Modal>
            </div>
        </div>
    )
}