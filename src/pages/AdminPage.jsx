import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { adataim, felhasznaloTorleseADMIN, felhasznalokLekerese, szerepkorModositasADMIN } from "../api";
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

export default function AdminPage(){
    const [user, setUser] = useState(null)
    const [felhasznalok, setFelhasznalok] =useState([])
    const nav = useNavigate();

    const [modositandoAdat, setModositandoAdat] = useState(null)
    useEffect(()=>{
        // akkor elküldi a backendnek a módosítandó adatokat és lekéri a felhasználóka
        
        (async()=>{
            console.log(modositandoAdat);
            console.log(modositandoAdat.felhasznalo_id);
            console.log(modositandoAdat.szerepkor);
            const data = await szerepkorModositasADMIN(modositandoAdat.felhasznalo_id,modositandoAdat.szerepkor);
            if(data.result){
                const data = await felhasznalokLekerese();
                if(data.result){
                    setFelhasznalok(data.felhasznalok)
                }
            }else{
                alert(data.message)
            }
        })()
    },[modositandoAdat])

    const [torlesOpen, setTorlesOpen] = useState(false);
    const [torlesHiba, setTorlesHiba] = useState("")
    const [userId, setUserId] = useState(-1);
    useEffect(() => {
        (async () => {
            const data = await adataim();
            if (data.result) {
                setUser(data.user)
            }else{
                nav('/')
            }
        })();
        (async ()=>{
            const data = await felhasznalokLekerese();
            if(data.result){
                setFelhasznalok(data.felhasznalok)
            }else{
                alert(data.message)
            }
        })()
    }, [])
    return (
        <div>
            <Navbar user={user}/>
            <div className="container my-3">
                <div className="border bg-white overflow-x-scroll">
                    <table className="table align-middle m-0">
                        <thead >
                            <tr className="table-light">
                                <td>#</td>
                                <td>email</td>
                                <td>felhasználónév</td>
                                <td>szerepkör</td>
                                <td>művelet</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                felhasznalok.map((felhasznalo,i)=>(
                                    <tr key={i}>
                                        <td>{felhasznalo.id}</td>
                                        <td>{felhasznalo.email}</td>
                                        <td>{felhasznalo.felhasznalonev}</td>
                                        <td>
                                            <select className="form-select" value={felhasznalo.admin} 
                                                    onChange={(e)=>setModositandoAdat({felhasznalo_id: felhasznalo.id, szerepkor: e.target.value})}>
                                                <option value="1">admin</option>
                                                <option value="0">sima felhasználó</option>
                                            </select>
                                        </td>
                                        <td>
                                            <Button color={'danger'} content={'Fiók törlése'} onClick={()=>{
                                                setUserId(felhasznalo.id)
                                                setTorlesOpen(true)
                                            }}/>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal open={torlesOpen} title={"Felhasználó törlése"} color={'danger'} onClose={() => setTorlesOpen(false)} submitText={"Törlés"} onSubmit={() => {
                (async () => {
                    // felhasznalo_id
                    const data = await felhasznaloTorleseADMIN(userId);
                    if(data.result){
                        setTorlesHiba('');
                        setTorlesOpen(false);
                        const data = await felhasznalokLekerese();
                        if(data.result){
                            setFelhasznalok(data.felhasznalok)
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
    )
}