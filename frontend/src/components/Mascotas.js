import React from 'react';
import axios from 'axios';
import {
    Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter,
} from "reactstrap";

const url = "http://localhost:3500/Mascotas/";

class Mascotas extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            modalInsertar: false,
            modalEliminar: false,
            form: {
                id: '',
                tipo: '',
                alimentacion: '',
                img:'',
                tipoModal: ''
            }
        }
    }

    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    }

    seleccionarAnimal = (animal) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: animal.id,
                tipo: animal.tipo,
                alimentacion: animal.alimentacion,
                img:animal.img
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
            <div className="Description container text-center">
                <h2>Mascotas</h2>
                    <br />
                    <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar</button>
                    <br />
                    <input 
                    className="form-control" 
                    type="text" name="id" id="id" 
                    placeholder="Ingrese tipo de mascota a buscar"
                    onChange={this.handleChange} value={form ? form.id : ''} />
                    <button class="btn btn-dark" onClick={() => this.peticionesGetFil()}>Buscar</button>
                <div className="container ">
                    <div class="card-deck mb-3 text-center">
                        {this.state.data.map((animal, index) => {
                            return (

                                <div className="col-md-4 " >
                                    <div className="card mt-4">
                                        <div className="card-title text-center">
                                            <h3>{animal.tipo}</h3>
                                            <span className="badge badge-pill badge-danger ml-2">
                                            {animal.tipo}
                                        </span>
                                        </div>

                                        <div className="text-center">
                                            <img className="Logo" src={animal.img} alt="Logo" />
                                        </div>
                                        <div className="card-body">
                            <p>{animal.alimentacion}</p>
                            <p><mark>{animal.id}</mark></p>
                                        </div>
                                        <div className="card-footer">
                                        <button className="btn btn-primary" onClick={() => { this.seleccionarAnimal(animal); this.modalInsertar() }}>Editar</button>
                                                {" "}
                                        <button className="btn btn-danger" onClick={() => { this.seleccionarAnimal(animal); this.setState({ modalEliminar: true }) }}>Borrar</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
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
                            
                                <label htmlFor="alimentacion">Alimentación</label>
                                <input className="form-control" type="text" name="alimentacion" id="alimentacion" onChange={this.handleChange} value={form ? form.alimentacion : ''} />
                                
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
                        Está seguro de eliminar la mascota  {form && form.tipo}
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

export default Mascotas;

