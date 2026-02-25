export default function Button({content, color, onClick}) {
    return (
        <div>
            <div className={`btn btn-${color}`} onClick={onClick}>{content}</div>
        </div>
    )
}