import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { kijelentkezes } from "../api";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react";
import Modal from "./Modal";

export default function Navbar({ user }) {
    const navigation = useNavigate();
    const isLoggedIn = !!user;
    const isAdmin = user?.admin === 1;

    // fiók törlése modal
    const [kijelentkezesOpen, setKijelentkezesOpen] = useState(false);
    const [kijekentkezesHiba, setKijelentkezesHiba] = useState("")

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary border">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand"> Szavazás </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExample04">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link"> Szavazás </Link>
                            </li>

                            {isLoggedIn && (
                                <li className="nav-item">
                                    <Link to="/images" className="nav-link"> Képeim </Link>
                                </li>
                            )}

                            {isLoggedIn && (
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link"> Fiókom </Link>
                                </li>
                            )}

                            {isAdmin && (
                                <li className="nav-item">
                                    <Link to="/admin" className="nav-link"> Admin Panel </Link>
                                </li>
                            )}

                            <li className="nav-item d-flex align-items-center ms-lg-3">
                                {isLoggedIn ? (
                                    <Button content="Kijelentkezés" color="dark" onClick={() => setKijelentkezesOpen(true)}
                                    />
                                ) : (
                                    <Button content="Bejelentkezés" color="dark" onClick={() => navigation("/login")} />
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Modal open={kijelentkezesOpen} title={"Kijelentkezés"} color={'warning'} onClose={() => setKijelentkezesOpen(false)} submitText={"Kijelentkezés"} onSubmit={() => {
                (async () => {
                    const data = await kijelentkezes();
                    console.log(data.result);
                    if (!data.result) {
                        setKijelentkezesHiba(data.message);
                    } else {
                        navigation("/");
                        window.location.reload();
                    }
                })()
            }}>
                {kijekentkezesHiba && (<div className="alert alert-danger" role="alert">{kijekentkezesHiba}</div>)}
                Biztos ki szeretne jelentkezni?
            </Modal>
        </div>
    );
}