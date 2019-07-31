import React from "react";

interface IModalProps {
    text: string;
    open: boolean;
    modalClose: any; // function to comunicate with ParentElement
}

interface IModalState {
    open: boolean;
}

class ResponseModal extends React.Component<IModalProps, IModalState> {
    constructor(props: IModalProps) {
        super(props);
        this.state = {
            open: props.open
        }
    }

    static getDerivedStateFromProps(props: IModalProps, state: IModalState) {
        if(props.open !== state.open)
            return {
                open: props.open
            }
        return null;
    }

    private closeModal = () => {
        this.props.modalClose(false);
        this.setState({
            open: false
        });
    }

    render() {
        return (<div className="container">
            <div className={this.state.open? "modal open" : "modal close"}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{this.props.text}</h4>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" onClick={this.closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export {ResponseModal}