import React from 'react';
import axios from 'axios';
import {
    Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter,
} from "reactstrap";

const url = "http://localhost:5000/api/fruta/";
class Ensalada extends React.Component {

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
                img: '',
                tipoModal: ''
            }
        }
    }

    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    }

    seleccionarFruta = (fruta) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: fruta.id,
                tipo: fruta.tipo,
                color: fruta.color,
                cantidad: fruta.cantidad,
                dulce: fruta.dulce,
                img: fruta.img,
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

    peticionesGetFil = () => {
        axios.get(url + this.state.form.id).then(response => {
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
            <div className="container">
                <br />
                <h1 className="text-center">
                    Ensala de frutas
                 </h1>
                <button className="btn btn-primary" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar</button>
                <br />
                <input 
                    className="form-control" 
                    type="text" name="id" id="id" 
                    placeholder="Ingrese tipo de mascota a buscar"
                    onChange={this.handleChange} value={form ? form.id : ''} />
                    <button class="btn btn-dark" onClick={() => this.peticionesGetFil()}>Buscar</button>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">tipo</th>
                            <th scope="col">color</th>
                            <th scope="col">cantidad</th>
                            <th scope="col">dulce</th>
                            <th scope="col">img</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((fruta, index) => {
                            return (

                                <tr>
                                    <th scope="row">{fruta.id}</th>
                                    <td>{fruta.tipo}</td>
                                    <td>{fruta.color}</td>
                                    <td>{fruta.cantidad}</td>
                                    <td>{fruta.dulce}</td>
                                    <td><img src={fruta.img} /></td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => {
                                            this.seleccionarFruta(fruta); this.modalInsertar()
                                        }}>Editar</button>
                                        {" "}
                                        <button className="btn btn-danger" onClick={() => { this.seleccionarFruta(fruta); this.setState({ modalEliminar: true }) }}>Borrar</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="container text-center">
                    <Modal id="formContent" isOpen={this.state.modalInsertar}>
                        <h1 className="text-center">Modal Insertar</h1>
                        <ModalHeader style={{ display: 'block' }}>
                        </ModalHeader>
                        <ModalBody>

                            <div className="form-group wrapper fadeInDown">
                               
                                <label htmlFor="id">id</label>
                                <input className="form-control" type="text" name="id" id="id" onChange={this.handleChange} value={form ? form.id : ''} />

                                <label htmlFor="tipo">Tipo de animal</label>
                                <input className="form-control" type="text" name="tipo" id="tipo" onChange={this.handleChange} value={form ? form.tipo : ''} />

                                <label htmlFor="color">Color</label>
                                <input className="form-control" type="text" name="color" id="color" onChange={this.handleChange} value={form ? form.color : ''} />

                                <label htmlFor="cantidad">Cantidad</label>
                                <input className="form-control" type="text" name="cantidad" id="cantidad" onChange={this.handleChange} value={form ? form.cantidad : ''} />

                                <label htmlFor="dulce">¿La fruta es dulce?</label>
                                <input className="form-control" type="text" name="dulce" id="dulce" onChange={this.handleChange} value={form ? form.dulce : ''} />

                                <label htmlFor="img">Imagen</label>
                                <input className="form-control" type="text" name="img" id="img" onChange={this.handleChange} value={form ? form.img : ''} />

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

export default Ensalada;