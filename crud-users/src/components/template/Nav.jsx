import React from 'react'
import { Link } from 'react-router-dom'

import './Nav.css'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            {/* Pode ser utilizado componente para os itens de menu */}
            <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/users">
                <i className="fa fa-users"></i> Usuários
            </Link>
        </nav>
    </aside>