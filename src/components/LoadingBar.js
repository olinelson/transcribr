import React, { Component } from 'react'
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'

 const LoadingBar = (props) =>  {
    // state = {
    //     show: false
    // }

    // onShow = () => {
    //     this.setState({ show: true })
    // }

    // onHide = () => {
    //     this.setState({ show: false })
    // }

    
        return (
            <div>
                <Loading
                    show={props.loading}
                    color="red"
                />

                {/* <button
                    type="button"
                    onClick={this.onShow}>
                    show
        </button>

                <button
                    type="button"
                    onClick={this.onHide}>
                    hide
        </button> */}
            </div>
        )
    
}

export default LoadingBar