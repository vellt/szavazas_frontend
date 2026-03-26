import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { kijelentkezes } from "../api";
import 'bootstrap/dist/js/bootstrap.esm.js'

export default function Navbar({ user }) {
    const navigation = useNavigate();
    const isLoggedIn = !!user; // user van érték-->true ha a user-ben nincs érték --> false
    // admin-e?
    const isAdmin = user?.admin === 1;
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid d-flex justify-content-between">
                    <Link to='/' className="px-3 text-decoration-none py-1 text-dark">Szavazás</Link>
                    <div className="d-flex justify-content-end">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04"
                            aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="d-flex justify-content-end">
                            <div className="collapse navbar-collapse " id="navbarsExample04">
                                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                                    <li class="nav-item d-flex align-items-center"><Link to='/' className="px-3 text-decoration-none py-1 text-dark">Szavazás</Link></li>
                                    {
                                        isLoggedIn && (<li class="nav-item d-flex align-items-center"><Link to='/images' className="px-3 text-decoration-none py-1 text-dark">Képeim</Link></li>)
                                    }
                                    {
                                        isLoggedIn && (<li class="nav-item d-flex align-items-center"><Link to='/profile' className="px-3 text-decoration-none py-1 text-dark">Fiókom</Link></li>)
                                    }
                                    {
                                        isAdmin && (<li class="nav-item d-flex align-items-center"><Link to='/admin' className="px-3 text-decoration-none py-1 text-dark">Admin Panel</Link></li>)
                                    }
                                    <div className="mx-3">
                                        {
                                            isLoggedIn ? (<Button content={"Kijelentkezés"} color={'dark'} onClick={async () => {
                                                const data = await kijelentkezes();
                                                console.log(data.result);
                                                if (!data.result) {
                                                    alert(data.message)
                                                } else {
                                                    navigation('/')
                                                    window.location.reload();
                                                }
                                            }} />)
                                                : (<Button content={"Bejelentkezés"} color={'dark'} onClick={() => navigation("/login")} />)
                                        }
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </nav>
        </div>
    )
}

