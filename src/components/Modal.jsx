export default function Modal({open, title, children, submitText, onClose, onSubmit}) {
    if(!open) return null;
    return (
        <div>
            <div className="modal d-block" tabindex="-1" style={{backgroundColor: "rgba(0,0,0,0.3)"}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                           {children}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                            {submitText && (<button type="button" className="btn btn-primary" onClick={onSubmit}>{submitText}</button>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}