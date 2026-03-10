import { useEffect, useState } from "react"
import TextBox from "../components/TextBox";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { belepes } from "../api";

export default function LoginPage() {
    const [usernameOrEmail, setUsernameOrEmail]=useState("");
    const [jelszo, setJelszo]=useState("");
    const navigation= useNavigate();
    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <div style={{ minWidth: 700 }}>
                <div className="text-center fs-1 mb-5">Bejelentkezés</div>
                <TextBox title={"E-mail vagy felhasználónév"} type={"text"} placeholder={"expample@example.com vagy user123"} value={usernameOrEmail} setValue={setUsernameOrEmail} />
                <TextBox title={"Jelszó"} type={"password"} placeholder={"******"} value={jelszo} setValue={setJelszo}/>
                <div className="text-center mt-3">
                    <Button content={"Belépés"} color={"dark"} onClick={async ()=>{
                        if(!usernameOrEmail || !jelszo){
                            alert("A felhasználónév vagy email jelszópáros megadása kötelező")
                            return;
                        } 
                        const res= await belepes(usernameOrEmail,jelszo);   
                        alert(res.message)
                        if (res.result) {
                            navigation('/')
                        }
                    }}/>
                </div>
                <div className="text-center mt-3">
                    <Link to="/" className="text-dark text-decoration-none">Vissza a főoldalra</Link>
                </div>
                <div className="text-center mt-3">
                    <Link to="/registration" className="text-dark text-decoration-none">Még nincs fiókom</Link>
                </div>
            </div>
        </div>
    )
}