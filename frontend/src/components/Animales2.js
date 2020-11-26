import React from 'react'
import axios from 'axios'
import {
    Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter,
} from "reactstrap";

const url = "http://localhost:5000/api/animal/";

class Aniamles2 extends React.Component {
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
    peticionesGet = () => {
        axios.get(url).then(response => {
            this.setState({ data: response.data })
        }).catch(error => {
            console.log(error.message);
        })
    }

    componentDidMount() {
        this.peticionesGet();
    }

    peticionesPost = async () => {
        await axios.post(url, this.state.form).then(response => {
            this.modalInsertar();
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

    render() {
        const { form } = this.state;
        return (
            <dev>
                <dev>
                <button type="button" class="btn btn-warning" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }} >Warning</button>
                </dev>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Alimentación</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map((animal, index) => {
                        return (
                        <tr>
                            <th scope="row">{animal.id}</th>
                        <td>{animal.tipo}</td>
                            <td>{animal.alimentacion}</td>
                            <td>
                            <button className="btn btn-primary" onClick={() => { this.seleccionarAnimal(animal); this.modalInsertar() }}>Actualizar</button>
                                                {" "}
                                                <button className="btn btn-danger" onClick={() => { this.seleccionarAnimal(animal); this.setState({ modalEliminar: true }) }}>Eliminar</button>
                            </td>
                        </tr>
                        
                        )
                    })}
                    </tbody>
                </table>

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

            </dev>
        )
    }
}
export default Aniamles2; 