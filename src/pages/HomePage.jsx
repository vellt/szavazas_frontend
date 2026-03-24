import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "../components/Navbar"
import { adataim, szavazatLeadasa, szavazatokLekerese } from "../api"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
    const [user, setUser] = useState(null)
    const [szavazatok, setSzavazatok] = useState([])
    const nav = useNavigate()

    // kérjük le (oldalbetöltéskor) az adataimat és töltsük bele a user állapotváltoztóba!
    useEffect(() => {
        (async () => {
            const data = await adataim();
            if (data.result) {
                setUser(data.user)
            }
        })();
        (async()=>{
            const data = await szavazatokLekerese();
            if(data.result){
                setSzavazatok(data.szavazatok)
            }else{
                alert(data.message)
            }
        })();
    }, [])

    console.log(szavazatok);

    return (
        <div>
            <Navbar user={user} />
            <div className="d-flex justify-content-center mt-3">
                <div className="row g-3">
                    {
                        szavazatok.map(item=>(
                            <div className="col-12 col-lg-6 col-xl-3">
                                <div>
                                    <div className="bg-light d-flex justify-content-center align-items-center" style={{width: "200px", height: "200px"}}>
                                        <div>{item.zsuri}</div>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <div className="d-flex align-items-center">{item.szavazat} db</div>
                                        {!!user && (<Button content={'Szavazás'} color={'dark'} onClick={(async()=>{
                                            const data = await szavazatLeadasa(item.zsuri_id);
                                            if(data.result){
                                                const data = await szavazatokLekerese();
                                                if(data.result){
                                                    setSzavazatok(data.szavazatok)
                                                }else{
                                                    alert(data.message)
                                                }
                                            }
                                        })}/>)}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div style={{ position: 'fixed', right: "20px", bottom: "20px", zIndex: 1}}>
                <Button color={'dark'} content={'Lássuk a győztest'} onClick={()=>nav('/winner')}/>
            </div>
        </div>
    )
}