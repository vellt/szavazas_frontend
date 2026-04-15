import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { adataim, BASE, gyoztesLekerese } from "../api";
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function WinnerPage(){
    const [user, setUser] = useState(null)
    const [gyoztes, setGyoztes] = useState(null)
    const nav = useNavigate()
    useEffect(() => {
        (async () => {
            const data = await adataim();
            if (data.result) {
                setUser(data.user)
            }
        })();
        (async ()=>{
            const data = await gyoztesLekerese();
            if(data.result){
                setGyoztes(data.gyoztes)
                console.log(data.gyoztes);
            }else{
                alert(data.message)
            }
        })()
    }, [])

    return (
        <div>
            <Navbar user={user}/>
            {
                !!gyoztes && (
                    <div className="d-flex justify-content-center mt-3">
                        <div>
                            <div style={{width: "230px", height: "330px"}}>
                                <img src={`${BASE}/uploads/${gyoztes.kep}`} alt="nyertes" className="h-100 w-100" style={{objectFit: "cover"}} />
                            </div>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <small>Győztes</small>
                                    <h3>{gyoztes.nev}</h3>
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                    <div>{gyoztes.db} db</div>
                                    <div>szavazat</div>
                                </div>
                            </div>
                            <div className="mt-2">
                                <Button content={'Vissza'} color={'dark'} onClick={()=>nav(-1)}/>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}