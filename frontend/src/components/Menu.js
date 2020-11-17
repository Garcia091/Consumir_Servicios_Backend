import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Menu extends Component {
    cerrarSesion = () => {
        cookies.remove('id', { path: "/" });
        cookies.remove('apellido_paterno', { path: "/" });
        cookies.remove('apellido_materno', { path: "/" });
        cookies.remove('nombre', { path: "/" });
        cookies.remove('username', { path: "/" });
        window.location.href = './';
    }

    componentDidMount() {
        if (!cookies.get('username')) {
            window.location.href = "./";
        }
    }

    render() {
        console.log('id: ' + cookies.get('id'));
        console.log('apellido_paterno: ' + cookies.get('apellido_paterno'));
        console.log('apellido_materno: ' + cookies.get('apellido_materno'));
        console.log('nombre: ' + cookies.get('nombre'));
        console.log('username: ' + cookies.get('username'));
        return (
            <div>
                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link active" href="#">Active</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li>
                    <li class="">
                    <button className="btn btn-success" onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
                    </li>
                </ul>
               
            </div>
        );
    }
}

export default Menu;