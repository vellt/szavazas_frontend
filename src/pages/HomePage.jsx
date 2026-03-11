import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "../components/Navbar"
import { adataim } from "../api"

export default function HomePage() {
    const [user, setUser] = useState(null)

    // kérjük le (oldalbetöltéskor) az adataimat és töltsük bele a user állapotváltoztóba!
    useEffect(() => {
        (async () => {
            const data = await adataim();
            if (data.result) {
                setUser(data.user)
            }
        })()
    }, [])

    return (
        <div>
            <Navbar user={user} />
            home
        </div>
    )
}