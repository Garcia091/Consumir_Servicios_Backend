import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter,
} from "reactstrap";

const url = "http://localhost:5000/api/animal/";

class Animal extends React.Component{
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


    render(){
        const { form } = this.state;
        return(
           <div>
                <h2>Animales de Colombia</h2>
                    <br />
                    <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Animal</button>
                    <br /><br />
                <div className="container ">
                <div class="card-deck mb-3 text-center">
                    {this.state.data.map((animal, index) => {
                        return (
                            <div className="col-md-4 " key={`item-navbar-${index}`}>
                                <div className="card mt-4">
                                    <div className="card-title text-center">
                                        <h3>{animal.tipo}</h3>
                                        <span className="badge badge-pill badge-danger ml-2">
                                            {animal.id}
                                        </span>
                                    </div>

                                    <div className="text-center">
                                    <img className="Logo" src={animal.img} alt="Logo" />
                                    </div>
                                    <div className="card-body">
                                       <p>{animal.alimentacion}</p> 
                                      
                                    </div>
                                    <div className="card-footer">
                                    <button className="btn btn-primary" onClick={() => { this.seleccionarAnimal(animal); this.modalInsertar() }}>Actualizar</button>
                                                {" "}
                                                <button className="btn btn-danger" onClick={() => { this.seleccionarAnimal(animal); this.setState({ modalEliminar: true }) }}>Eliminar</button>
                                            
                                    </div>
                                </div>
                            </div>
                        )
                    })}
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
                                <label htmlFor="tipo">Tipo de animal</label>
                                <input className="form-control" type="text" name="tipo" id="tipo" onChange={this.handleChange} value={form ? form.tipo : ''} />
                                <br />
                                <label htmlFor="alimentacion">Alimentación </label>
                                <input className="form-control" type="text" name="alimentacion" id="color" onChange={this.handleChange} value={form ? form.alimentacion : ''} />
                                <br />
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
                        Está seguro de eliminar el animal  {form && form.tipo}
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
export default Animal;