import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';
import '../css/Registro.css'

const url="http://localhost:3500/usuario";
const cookies = new Cookies();

class Registro extends Component {
  constructor() {
    super();
    this.state = {
        data: [],
        form: {
            id: '',
            apellido_paterno: '',
            apellido_materno: '',
            nombre: '',
            username: '',
            password: ''
        }
    }
}

peticionesGet=()=>{
  axios.get(url).then(response => {
    this.setState({data: response.data})
  }).catch(error=>{
    console.log(error.message);
  })
}
componentDidMount(){
  this.peticionesGet();
}

peticionesPost=async()=>{
  await axios.post(url,{id:this.state.form.id,
                                apellido_paterno: this.state.form.apellido_paterno,
                                apellido_materno:this.state.form.apellido_materno,
                                nombre:this.state.form.nombre,
                                username: this.state.form.username,
                                password: md5(this.state.form.password)}).then(response=>{
   alert('Usuario Registrado')
   window.location.href="./";
  }).catch(error=>{
    console.log(error.message);
  })
}

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form)
    }

    iniciarSesion=async()=>{
        await axios.get(url, {params: {username: this.state.form.username, password: md5(this.state.form.password)}})
        .then(response=>{
          console.log( response.data);
        }).catch(error=>{
            console.log(error);
        })

    }


    render() {
        return (
    <div className="wrapper fadeInDown">
        <div id="formContent">
        <div className="fadeIn first ">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS689Xb1GJwNGzZl9KR7CTRKAZFaXt1060H32xPbb8hw_NXNpJ409Sl-aLnPsJQUfKJnYEV_KndttR1bbUKS_f7DGE3OP59H1Y&usqp=CAU&ec=45725305" id="icon" alt="User Icon" />
                <h3>Crea una cuenta</h3>
              </div>
          <div className="form-group">
            <label>id:</label>
            <br />
            <input
              type="int"
              className="form-control"
              name="id"
              placeholder={this.state.data.length+1}
              onChange={this.handleChange}
            />

            <br />
            <label>Apellido paterno: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="apellido_paterno"
              onChange={this.handleChange}
            />
            <br />
            <label>Apellido materno: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="apellido_materno"
              onChange={this.handleChange}
            />
            <br />
             <label>nombre: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nombre"
              onChange={this.handleChange}
            />
            <br />
            <label>username: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={this.handleChange}
            />
            <br />
            <label>password: </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.handleChange}
            />
            <button className="btn btn-primary  " onClick={()=> this.peticionesPost()}>Enviar</button>
           
          </div>
        </div>
      </div>
        );
    }
}

export default Registro;