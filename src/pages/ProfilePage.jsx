import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "../components/Navbar"
import Button from '../components/Button'
import Modal from '../components/Modal'
import TextBox from '../components/TextBox'
import { useState } from 'react'
import { emailModositas, felhasznalonevModositas, fiokTorlese, jelszoModositas } from '../api'

export default function ProfilePage() {
    // email modalhoz tartozik
    const [emailOpen, setEmailOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [emailHiba, setEmailHiba] = useState("")

    // felhasználónév modalhoz tartozik
    const [felhasznalonevOpen, setFelhasznalonevOpen] = useState(false);
    const [felhasznalonev, setFelhasznalonev] = useState("");
    const [felhasznalonevHiba, setFelhasznalonevHiba] = useState("")

    // jelszó módosítás modalhoz tartozik
    const [jelszoOpen, setJelszoOpen] = useState(false);
    const [aktJelszo, setAktJelszo] = useState("");
    const [ujJelszo1, setUjJelszo1] = useState("");
    const [ujJelszo2, setUjJelszo2] = useState("");
    const [jelszoHiba, setJelszoHiba] = useState("")

    // fiók törlése modal
    const [torlesOpen, setTorlesOpen] = useState(false);
    const [torlesHiba, setTorlesHiba] = useState("")

    return (
        <div>
            <Navbar />
            <div className='d-flex justify-content-center mt-5'>
                <div>
                    <div className='my-2'>
                        <Button color={'dark'} content={'Email módosítása'} onClick={() => setEmailOpen(true)} />
                    </div>
                    <div className='my-2'>
                        <Button color={'dark'} content={'Felhasználónév módosítása'} onClick={() => setFelhasznalonevOpen(true)} />
                    </div>
                    <div className='my-2'>
                        <Button color={'dark'} content={'Jelszó módosítása'} onClick={() => setJelszoOpen(true)} />
                    </div>
                    <div className='my-2'>
                        <Button color={'danger'} content={'Fiók törlése'} onClick={() => setTorlesOpen(true)} />
                    </div>
                </div>
            </div>
            {/* Email módosítás */}
            <Modal open={emailOpen} title={"Email módosítása"} onClose={() => setEmailOpen(false)} submitText={"Módosítás"} onSubmit={() => {
                (async () => {
                    const res = await emailModositas(email);
                    if (!res.result) {
                        setEmailHiba(res.message);
                    }
                    else {
                        setEmailHiba('');
                        setEmail('');
                        setEmailOpen(false);
                    }
                })()
            }}>
                {emailHiba && (<div className="alert alert-danger" role="alert">{emailHiba}</div>)}
                <TextBox title={"E-mail"} type={"email"} placeholder={"expample@example.com"} value={email} setValue={setEmail} />
            </Modal>

            {/* felhasználónév módosítás */}
            <Modal open={felhasznalonevOpen} title={"Felhasználónév módosítása"} onClose={() => setFelhasznalonevOpen(false)} submitText={"Módosítás"} onSubmit={() => {
                (async () => {
                    const res = await felhasznalonevModositas(felhasznalonev);
                    if (!res.result) {
                        setFelhasznalonevHiba(res.message);
                    }
                    else {
                        setFelhasznalonevHiba('');
                        setFelhasznalonev('');
                        setFelhasznalonevOpen(false);
                    }
                })()
            }}>
                {felhasznalonevHiba && (<div className="alert alert-danger" role="alert">{felhasznalonevHiba}</div>)}
                <TextBox title={"Felhasználónév"} type={"text"} placeholder={"John Doe"} value={felhasznalonev} setValue={setFelhasznalonev} />
            </Modal>

            {/* jelszó módosítás */}
            <Modal open={jelszoOpen} title={"Jelszó módosítása"} onClose={() => setJelszoOpen(false)} submitText={"Módosítás"} onSubmit={() => {
                (async () => {
                    if (ujJelszo1 === ujJelszo2) {
                        const res = await jelszoModositas(aktJelszo, ujJelszo1);
                        if (!res.result) {
                            setJelszoHiba(res.message);
                        }
                        else {
                            setJelszoHiba('');
                            setAktJelszo('');
                            setUjJelszo1('');
                            setUjJelszo2('');
                            setJelszoOpen(false);
                        }
                    }else{
                        setJelszoHiba('Az új jelszó és megerősítése nem egyezik')
                    }
                })()
            }}>
                {jelszoHiba && (<div className="alert alert-danger" role="alert">{jelszoHiba}</div>)}
                <TextBox title={"Aktuális jelszó"} type={"password"} placeholder={"********"} value={aktJelszo} setValue={setAktJelszo} />
                <TextBox title={"Új jelszó"} type={"password"} placeholder={"********"} value={ujJelszo1} setValue={setUjJelszo1} />
                <TextBox title={"Új jelszó megerősítése"} type={"password"} placeholder={"********"} value={ujJelszo2} setValue={setUjJelszo2} />
            </Modal>

            {/* fiók törlés */}
            <Modal open={torlesOpen} title={"Fiók törlése"} onClose={() => setTorlesOpen(false)} submitText={"Törlés"} onSubmit={() => {
                (async () => {
                    const res = await fiokTorlese();
                    if (!res.result) {
                        setTorlesHiba(res.message);
                    }
                    else {
                        setTorlesHiba('');
                        setTorlesOpen(false);
                    }
                })()
            }}>
                {torlesHiba && (<div className="alert alert-danger" role="alert">{torlesHiba}</div>)}
                Gondolt át nagyon a döntésedet! A művelet nem vonható vissza!
            </Modal>
        </div>
    )
}