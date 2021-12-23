import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <div className='ri-header'>
                <div className='ri-header__logo-wrapper'>
                    <img className='ri-header__logo' src={this.props.src} alt='logo'></img>
                </div>
                <div className='ri-header__viewer-wrapper'>
                    <ul>
                        <li>
                            <button class="btn btn-primary" aria-label="search">
                                <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
