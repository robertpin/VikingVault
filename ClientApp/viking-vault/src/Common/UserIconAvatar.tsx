import React from 'react';
 
interface IUserIconAvatarProps {
    pictureUri: string;
    pictureStyle: string;
    defaultPicture: string;
}
 
interface IUserIconAvatarState {
    isImageOk: boolean;
}
 
class UserIconAvatar extends React.Component<IUserIconAvatarProps, IUserIconAvatarState> {
    constructor(props: any) {
        super(props);
 
        this.state = {
            isImageOk: true
        };
    }
 
    render() {
        const avatar = (this.state.isImageOk)
            ? (<img
                    onError={() => {
                        this.setState({
                            isImageOk: false
                        });
                    }}
                    className={this.props.pictureStyle}
                    src={this.props.pictureUri || ''}
                    alt=""
                />
            )
            : (
                <img
                className={this.props.pictureStyle} src={this.props.defaultPicture} alt=""/>
            );
 
        return (
            <React.Fragment>
                 { avatar }
            </React.Fragment>
        );
    }
}

export default UserIconAvatar