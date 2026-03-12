import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "../components/Navbar"
import Button from '../components/Button'
import Modal from '../components/Modal'

export default function ProfilePage() {
    return (
        <div>
            <Navbar />
            <div className='d-flex justify-content-center mt-5'>
                <div>
                    <div className='my-2'>
                        <Button color={'dark'} content={'Email módosítása'} onClick={()=>Modal()}/>
                    </div>
                    <div className='my-2'>
                        <Button color={'dark'} content={'Felhasználónév módosítása'} />
                    </div>
                    <div className='my-2'>
                        <Button color={'dark'} content={'Jelszó módosítása'} />
                    </div>
                    <div className='my-2'>
                        <Button color={'danger'} content={'Fiók törlése'} />
                    </div>
                </div>
            </div>
        </div>
    )
}