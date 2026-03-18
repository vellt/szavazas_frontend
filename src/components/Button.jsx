export default function Button({content, color, onClick}) {
    return (
        <div>
            <div className={`btn btn-${color} w-100`} onClick={onClick}>{content}</div>
        </div>
    )
}