import React from 'react';
import axios from 'axios'; //Compartir resurcos entre servidores
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //usar iconos en React
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table,Button,Container,Modal,ModalHeader,ModalBody,FormGroup,ModalFooter,
} from "reactstrap";


const url = " http://localhost:3500/Ejercicio/";

class Rutina extends React.Component {
  constructor(){
    super();
    this.state = {
      data:[],
      modalInsertar: false,
      modalEliminar: false,
      form:{
        id: '',
        nomejercicio: '',
        descripcion: '',
        rutina: '',
        tipoModal: ''
      }
    }}
    modalInsertar=()=>{
      this.setState({modalInsertar: !this.state.modalInsertar});
    }
    
    //seleccionar carro
    seleccionarCarro=(elemento)=>{
     this.setState({
       tipoModal: 'actualizar',
       form: {
          id: elemento.id,
          nomejercicio: elemento.nomejercicio,
          descripcion: elemento.descripcion,
          rutina: elemento.rutina,
      
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
      <div className="container sm 4 - md 4 - lg 4">
        <br/>
        <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal:'insertar'});this.modalInsertar()}}>Agregar Carro</button>
        <br/><br/>
        <section className="contenedorEjercicios  ">
          <h1>ENTRENATE JMS</h1>
          <ul className="card-deck mb-3 text-center">
            {this.state.data.map((elemento, indice) => {
              return (
                <div className="col-md-4 ">
                  <div className="card  mt-4" key={indice}>
                  <h3 className="card-title"> {elemento.nomejercicio}</h3>
                    
          
                  <img src={elemento.img} alt="Img"></img>
                
                      <div  >
                        <li>{elemento.descripcion}</li>
                      </div>
                
                 
                  <button
                    type="button"
                    className="btn btn-dark btn-lg btn-block"
                  >
                    <a href={elemento.ruta}>¿Cómo se hace?</a>{" "}
                  </button>
                  <button className="btn btn-primary" onClick={()=>{this.seleccionarCarro(elemento);this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                      {" "}
                      <button className="btn btn-danger" onClick={()=>{this.seleccionarCarro(elemento);this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                    
                </div>
                </div>
              );
            })}
          </ul>
          <button type="button" className="btn btn-dark btn-lg btn-">
            <a href="seleccionar">Atrás</a>
          </button>
        </section>

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
              <label htmlFor="nomejercicio">nombre jercicio</label>
              <input className="form-control" type="text" name="nomejercicio" id="nomejercicio"  onChange={this.handleChange} value={form?form.nomejercicio: '' }/>
              <br/>
              <label htmlFor="descripcion">descripcion</label>
              <input className="form-control" type="text" name="descripcion" id="descripcion" onChange={this.handleChange} value={form?form.descripcion: ''}/>
             <br/>
             <label htmlFor="MODELO">rutina</label>
              <input className="form-control" type="text" name="rutina" id="rutina" onChange={this.handleChange} value={form?form.rutina:''}/>
              <br/>
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
export default Rutina;
