import React from 'react';
import axios from 'axios'; //Compartir resurcos entre servidores
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //usar iconos en React
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter,
} from "reactstrap";
import '../css/Frutas.css'

const url = "http://localhost:5000/api/fruta/";

class FrutaDB extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            modalInsertar: false,
            modalEliminar: false,
            form: {
                id: '',
                tipo: '',
                color: '',
                cantidad: '',
                dulce: '',
                tipoModal: ''
            }
        }
    }

    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    }

    seleccionarFruta = (frutas) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: frutas.id,
                tipo: frutas.tipo,
                color: frutas.color,
                cantidad: frutas.cantidad,
                dulce: frutas.dulce
            }
        })
    }

    peticionesGet = () => {
        axios.get(url).then(response => {
            this.setState({ data: response.data })
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionesPost = async () => {
        await axios.post(url, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionesGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionesPut = () => {
        axios.put(url + this.state.form.id, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionesGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    PeticionesDelete = () => {
        axios.delete(url + this.state.form.id).then(response => {
            this.setState({ modalEliminar: false });
            this.peticionesGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form)
    }

    componentDidMount() {
        this.peticionesGet();
    }

    render() {
        const { form } = this.state;
        return (
            <div>
                <div className="App container text-center">
                    <h2>Frutas de Colombia</h2>
                    <br />
                    <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Fruta</button>
                    <br /><br />
                    <div className="container ">
                        <div class="card-deck mb-3 text-center">
                            {this.state.data.map((frutas, index) => {
                                return (
                                    <div className="col-md-4 " key={`item-navbar-${index}`}>
                                        <div className="card mt-4">
                                            <div className="card-title text-center">
                                                <h3>{frutas.nombre}</h3>
                                                <span className="badge badge-pill badge-danger ml-2">
                                                    {frutas.tipo}
                                                </span>
                                            </div>

                                            <div className="text-center">
                                                <img className="Logo" src={frutas.img} alt="Logo" />
                                            </div>
                                            <div className="card-body">
                                                <p>{frutas.color}</p>
                                                <p><mark>{frutas.cantidad}</mark></p>
                                            </div>
                                            <div className="card-footer">
                                                <button className="btn btn-primary" onClick={() => { this.seleccionarFruta(frutas); this.modalInsertar() }}><FontAwesomeIcon icon={faEdit} /></button>
                                                {" "}
                                                <button className="btn btn-danger" onClick={() => { this.seleccionarFruta(frutas); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="container text-center">
                    <Modal id="formContent" isOpen={this.state.modalInsertar}>
                        <h1>Modal Insertar</h1>
                        <ModalHeader style={{ display: 'block' }}>
                        </ModalHeader>
                        <ModalBody>

                            <div className="form-group wrapper fadeInDown">
                                <label htmlFor="id">id</label><br />
                                <input className="form-control" type="text" name="id" id="id" onChange={this.handleChange} value={form ? form.id : ''} />
                                <br />
                                <label htmlFor="tipo">Tipo de fruta</label>
                                <input className="form-control" type="text" name="tipo" id="tipo" onChange={this.handleChange} value={form ? form.tipo : ''} />
                                <br />
                                <label htmlFor="color">Color</label>
                                <input className="form-control" type="text" name="color" id="color" onChange={this.handleChange} value={form ? form.color : ''} />
                                <br />
                                <label htmlFor="cantidad">Cantidad</label>
                                <input className="form-control" type="text" name="cantidad" id="cantidad" onChange={this.handleChange} value={form ? form.cantidad : ''} />
                                <br />
                                <label htmlFor="dulce">La fruta es dulce?</label>
                                <input className="form-control" type="text" name="dulce" id="dulce" onChange={this.handleChange} value={form ? form.dulce : ''} />
                            </div>

                        </ModalBody>
                        <ModalFooter >
                            {this.state.tipoModal == 'insertar'}
                            <button className="btn btn-success" onClick={() => this.peticionesPost()}>
                                Insertar
                            </button>
                            <button className="btn btn-primary" onClick={() => this.peticionesPut()}>
                                Actualizar
                            </button>
                            <button className="btn btn-danger" onClick={() => this.modalInsertar()}>
                                Cancelar
                             </button>
                        </ModalFooter>

                    </Modal>
                </div>
                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        Está seguro de eliminar la fruta  {form && form.tipo}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => this.PeticionesDelete()}>Sí</button>
                        <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
                    </ModalFooter>
                </Modal>
            </div>

        )
    }

}

export default FrutaDB;