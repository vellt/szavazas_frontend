import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { kijelentkezes } from "../api";

export default function Navbar({user}) {
    const navigation = useNavigate();
    const isLoggedIn=!!user; // user van érték-->true ha a user-ben nincs érték --> false
    // admin-e?
    const isAdmin = user?.admin === 1;
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid d-flex justify-content-between">
                    <a className="navbar-brand" href="#">Szavazás</a>
                    <div className="d-flex ">
                        <Link to='/' className="px-3 text-decoration-none py-1 text-dark">Szavazás</Link>
                        <Link to='/' className="px-3 text-decoration-none py-1 text-dark">Képeim</Link>
                        <Link to='/' className="px-3 text-decoration-none py-1 text-dark">Fiókom</Link>
                        {
                            isAdmin && (<Link to='/' className="px-3 text-decoration-none py-1 text-dark">Admin Panel</Link>)
                        }
                        <div className="mx-3">
                            {
                                isLoggedIn ? (<Button content={"Kijelentkezés"} color={'dark'} onClick={async()=>{
                                                    const data= await kijelentkezes();
                                                    console.log(data.result);
                                                    if(!data.result){
                                                        alert(data.message)
                                                    }else{
                                                        navigation('/')
                                                        window.location.reload();
                                                    }
                                                }}/>)
                                           : (<Button content={"Bejelentkezés"} color={'dark'} onClick={()=>navigation("/login")}/>)
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}