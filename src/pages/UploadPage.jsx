import { useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "../components/Navbar"
import { useState, useEffect } from "react";
import Button from "../components/Button";
import { kepFeltoltes } from "../api";

export default function UploadPage(){
    const nav = useNavigate();
    const [user, setUser] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [file, setFile] = useState(null)
    const [zsuri, setZsuri] = useState("1")

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

    const saveToPreview= async (e) => {
        const selectedFile = e.target.files[0];
        if(selectedFile){
            setFile(selectedFile);
            setImagePreview(URL.createObjectURL(selectedFile))
        }
    }

    const uploadData= async ()=>{
        if(!file){
            alert('nincs kiválasztva kép');
            return;
        }
        const data = await kepFeltoltes(file, zsuri);
        console.log(data);
        alert(data.message);
    }

    return (
        <div>
            <Navbar user={user}/>
            <div className="container mt-4 d-flex flex-column" style={{maxWidth: "300px"}}>
                <div className="d-flex justify-content-center">
                    <div className="border rounded bg-light d-flex align-items-center justify-content-center" style={{width:"180px", height: "230px"}}>
                        {
                            imagePreview ? (<img src={imagePreview} className="w-100 h-100" style={{objectFit: "cover"}} />)
                                         : (<div>Kép helye</div>)
                        }
                    </div>
                </div>
                <div className="text-center mt-3">
                    <input type="file" accept="image/*" className="form-control mb-3" onChange={saveToPreview} />
                </div>
                <div>Zsűri kiválasztása</div>
                <div className="text-center">
                    <select className="form-control" value={zsuri} onChange={(e)=>setZsuri(e.target.value)}>
                        <option value="1">Curtis</option>
                        <option value="2">Herceg Erika</option>
                        <option value="3">Marics Peti</option>
                        <option value="4">Tóth Gabi</option>
                    </select>   
                </div>
                <div className="d-flex gap-2 mt-3">
                    <div className="w-50">
                        <Button content={"Mégse"} color={'dark'}/>
                    </div>
                    <div className="w-50">
                        <Button content={"Kép feltöltése"} color={'dark'} onClick={()=>(async()=>await uploadData())()}/>
                    </div>
                </div>
            </div>
        </div>
    )
}