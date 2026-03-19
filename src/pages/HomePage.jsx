import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "../components/Navbar"
import { adataim, szavazatokLekerese } from "../api"
import Button from "../components/Button"

export default function HomePage() {
    const [user, setUser] = useState(null)
    const [szavazatok, setSzavazatok] = useState([])

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

    return (
        <div>
            <Navbar user={user} />
            <div className="d-flex justify-content-center mt-3">
                <div className="row g-3">
                    <div className="col-12 col-lg-6 col-xl-3">
                        <div>
                            <div className="bg-light d-flex justify-content-center align-items-center" style={{width: "200px", height: "200px"}}>
                                <div>Curtis</div>
                            </div>
                            <div className="d-flex justify-content-between mt-2">
                                <div className="d-flex align-items-center">10 db</div>
                                <Button content={'Szavazás'} color={'dark'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}