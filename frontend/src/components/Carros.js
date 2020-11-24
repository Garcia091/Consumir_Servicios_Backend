import React from 'react';
import axios from 'axios'; //Compartir resurcos entre servidores
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //usar iconos en React
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table,Button,Container,Modal,ModalHeader,ModalBody,FormGroup,ModalFooter,
} from "reactstrap";

import {contarP} from './Contar'

import '../css/Registro.css'


const url = "http://localhost:3500/consejo/";

class Carros extends React.Component {
  constructor(){
    super();
    this.state = {
      data:[],
      modalInsertar: false,
      modalEliminar: false,
      form:{
        id: '',
        PLACA: '',
        MARCA: '',
        MODELO: '',
        DOC_DUENIO: '',
        tipoModal: ''
      }
    }}
    modalInsertar=()=>{
      this.setState({modalInsertar: !this.state.modalInsertar});
    }
    
    //seleccionar carro
    seleccionarCarro=(carros)=>{
     this.setState({
       tipoModal: 'actualizar',
       form: {
          id: carros.id,
          PLACA: carros.PLACA,
          MARCA: carros.MARCA,
          MODELO: carros.MODELO,
          DOC_DUENIO: carros.DOC_DUENIO
       }
     })
    }
    
      //Petición tipo GET
    peticionesGet=()=>{
      axios.get(url).then(response => {
        //console.log(response.data) 
        //asignaremos al estado
        this.setState({data: response.data})
      }).catch(error=>{
        console.log(error.message);
      })
    }
    
    //Petición tipo POST
    peticionesPost=async()=>{
      await axios.post(url,this.state.form).then(response=>{
        this.modalInsertar();
        this.peticionesGet();
      }).catch(error=>{
        console.log(error.message);
      })
    }
    
    //Peticiones tipo PUT
    peticionesPut=()=>{
      axios.put(url+this.state.form.id, this.state.form).then(response=>{
        this.modalInsertar();
        this.peticionesGet();
      }).catch(error=>{
        console.log(error.message);
      })
    }
    
    PeticionesDelete=()=>{
      axios.delete(url+this.state.form.id).then(response=> {
        this.setState({modalEliminar: false});
         this.peticionesGet();
      }).catch(error=>{
        console.log(error.message);
      })
    }
    
    //carpturar lo que el usuario inserte en las cajas de texto
    //como se ejecuta en segundo plano debe ser asíncrono
    handleChange= async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form)
    }
    
    //primer ciclo de vida de los componentes
    
    componentDidMount(){
      this.peticionesGet();
    }
    
   
    
  render() {
    const {form}=this.state;
    return (
      <div className="App">
        <br/>
        <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal:'insertar'});this.modalInsertar()}}>Agregar Carro</button>
        <br/><br/>
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>PLACA</th>
              <th>MARCA</th>
              <th>MODELO</th>
              <th>DUEÑO</th>
              <th>OPERACIONES</th>
            </tr>
          </thead>
          <tbody>
              {this.state.data.map(carros =>{
                return(
                  <tr>
                    <td>{carros.id}</td>
                    <td>{carros.PLACA}</td>
                    <td>{carros.MARCA}</td>
                    <td>{carros.MODELO}</td>
                    <td>{carros.DOC_DUENIO}</td>
                    <td>
                      <button className="btn btn-primary" onClick={()=>{this.seleccionarCarro(carros);this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                      {" "}
                      <button className="btn btn-danger" onClick={()=>{this.seleccionarCarro(carros);this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
<div className="container text-center">
        <Modal id="formContent" isOpen={this.state.modalInsertar}>
          <h1>Modal Insertar</h1>
          <ModalHeader style={{display: 'block'}}>
          </ModalHeader>
          <ModalBody>
        
            <div className="form-group wrapper fadeInDown">
              <label htmlFor="PLACA">id</label><br />
              <input className="form-control" type="text" name="id" id="id"   onChange={this.handleChange} value={form?form.id: '' }/>
              <br/>
              <label htmlFor="PLACA">PLACA</label>
              <input className="form-control" type="text" name="PLACA" id="PLACA"  onChange={this.handleChange} value={form?form.PLACA: '' }/>
              <br/>
              <label htmlFor="MARCA">MARCA</label>
              <input className="form-control" type="text" name="MARCA" id="MARCA" onChange={this.handleChange} value={form?form.MARCA: ''}/>
             <br/>
             <label htmlFor="MODELO">MODELO</label>
              <input className="form-control" type="text" name="MODELO" id="MODELO" onChange={this.handleChange} value={form?form.MODELO:''}/>
              <br/>
             <label htmlFor="DOC_DUENIO">DOC_DUENIO</label>
              <input className="form-control" type="text" name="DOC_DUENIO" id="DOC_DUENIO" onChange={this.handleChange} value={form?form.DOC_DUENIO:''}/>
            </div>
          
          </ModalBody>
          <ModalFooter >
            {this.state.tipoModal=='insertar'}
            <button className="btn btn-success" onClick={()=>this.peticionesPost()}>
              Insertar
            </button>
             <button className="btn btn-primary" onClick={()=>this.peticionesPut()}>
              Actualizar
            </button>
            <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>
              Cancelar
            </button>
          </ModalFooter>
      
        </Modal>
        </div>
       <Modal isOpen={this.state.modalEliminar}>
         <ModalBody>
           Está seguro de eliminar el carro con placa {form && form.PLACA}
         </ModalBody>
         <ModalFooter>
           <button className="btn btn-danger" onClick={()=>this.PeticionesDelete()}>Sí</button>
           <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
         </ModalFooter>
       </Modal>

       
    </div>
    );
  }
}
export default Carros;
