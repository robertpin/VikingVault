import React from "react";

const modalOpenStyle = {
    display: "block",
    opacity: 1,
    backgroundColor: "rgba(0,0,0,0.5)"
}

const modalCloseStyle = {
    display: "none"
}

class ResponseModal extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            open: props.open
        }
    }

    static getDerivedStateFromProps(props: any, state: any) {
        if(props.open !== state.open)
            return {
                open: props.open
            }
        return null;
    }

    private closeModal = () => {
        // console.log("trying to close modal");
        this.props.modalClose(false);
        this.setState({
            open: false
        });
    }

    render() {
        return (<div className="container">
            <div className="modal" id="myModal" role="dialog" style={this.state.open?modalOpenStyle: modalCloseStyle}>
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