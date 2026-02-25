export default function TextBox({title, placeholder, type, value, setValue}) {
    return (
        <div>
            <label for={title} className="form-label">{title}</label>
            <input type={type} className="form-control" id={title} placeholder={placeholder} 
                   value={value} onChange={(e)=>setValue(e.target.value)}></input>
        </div>
    )
}