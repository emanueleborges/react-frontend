import React, { useState , useEffect} from 'react';
import './App.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

export default function Pecas()  {
  const baseUrl="http://ec2-177-71-146-140.sa-east-1.compute.amazonaws.com:3000/api";
  const [data, setData]=useState([]);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  const [gestorSeleccionado, setGestorSeleccionado]=useState({
    id: '',
    nomepeca: '',
    marcapeca: ''
  })
  const handleChange=e=>{
    const {name, value}=e.target;
    setGestorSeleccionado({
      ...gestorSeleccionado,
      [name]: value
    });
    console.log(gestorSeleccionado);
  }
  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }
   const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }
  const peticionGet=async()=>{
    await axios.get(baseUrl+"/pecas")
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }
  const peticionPost=async()=>{
    await axios.post(baseUrl+"/pecas", gestorSeleccionado)
    .then(response=>{
      console.log(response)
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
      peticionGet();
    }).catch(error=>{
      console.log(error);
    })
  }
  const peticionPut=async()=>{
    await axios.patch(baseUrl+"/pecas/"+gestorSeleccionado.id, gestorSeleccionado)
    .then(response=>{
      var respuesta=response.data;
      var dataAuxiliar=data;
      dataAuxiliar.map( (gestor) => {
        if(gestor.id===gestorSeleccionado.id){
          gestor.nomepeca=respuesta.nomepeca;
          gestor.marcapeca=respuesta.marcapeca;
        }
      });
      abrirCerrarModalEditar();
      peticionGet();

    }).catch(error=>{
      console.log(error);
    })
  }
  const peticionDelete=async()=>{
    await axios.delete(baseUrl+"/pecas/"+gestorSeleccionado.id)
    .then(response=>{
     setData(data.filter(gestor=>gestor.id!==response.data));
      abrirCerrarModalEliminar();
      peticionGet();
    }).catch(error=>{
      console.log(error);
    })
  }
  const seleccionarGestor=(gestor, caso)=>{
    setGestorSeleccionado(gestor);
    (caso==="Editar")?
    abrirCerrarModalEditar(): abrirCerrarModalEliminar();
  }
  useEffect(()=>{
    peticionGet();
  },[])
  return (
    <>
      <div className="App">
        <div className="col-sm-12 col-md-12 country-card text-uppercase">
          <div className="px-3">
            <span className="country-name text-dark d-block font-weight-bold h1">Tela de Peças</span>
          </div>
          <div className="p-3 mt-0 text-right" >
            <button onClick={() => abrirCerrarModalInsertar()} className="btn btn-success">Novo</button>
          </div>
          <div>
          <table className="table table-bordered table-striped" >
            <thead>
              <tr>
                <th>ID</th>
                <th align='left'>nome produto</th>
                <th align='left'>marca produto</th>
                <th align='center'>Ação</th>
              </tr>
            </thead>
            <tbody>
              {data.map(gestor => (
                <tr key={gestor.id}>
                  <td align='center'>{gestor.id}</td>
                  <td align='left'>{gestor.nomepeca}</td>
                  <td align='left'>{gestor.marcapeca}</td>
                  <td align='center'>
                    <button className="btn btn-primary" onClick={() => seleccionarGestor(gestor, "Editar")}>Editar</button> {"  "}
                    <button className="btn btn-danger" onClick={() => seleccionarGestor(gestor, "Eliminar")}>Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          <Modal isOpen={modalInsertar}>
            <ModalHeader>Cadastrar Registro</ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label>nomepeca: </label>
                <br />
                <input type="text" className="form-control" name="nomepeca" onChange={handleChange} />
                <br />
                <label>marcapeca: </label>
                <br />
                <input type="text" className="form-control" name="marcapeca" onChange={handleChange} />
                <br />
              </div>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-primary" onClick={() => peticionPost()}>Insertar</button>{"   "}
              <button className="btn btn-danger" onClick={() => abrirCerrarModalInsertar()}>Cancelar</button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={modalEditar}>
            <ModalHeader>Editar Registro</ModalHeader>
            <ModalBody>
              <div className="form-group">
                <label>ID: </label>
                <br />
                <input type="text" className="form-control" readOnly value={gestorSeleccionado && gestorSeleccionado.id} />
                <br />
                <label>nomepeca: </label>
                <br />
                <input type="text" className="form-control" name="nomepeca" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.nomepeca} />
                <br />
                <label>marcapeca: </label>
                <br />
                <input type="text" className="form-control" name="marcapeca" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.marcapeca} />
                <br />
                
              </div>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-primary" onClick={() => peticionPut()}>Salvar</button>{"   "}
              <button className="btn btn-danger" onClick={() => abrirCerrarModalEditar()}>Cancelar</button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={modalEliminar}>
            <ModalBody>
              Deseja Excluir o Registro: {gestorSeleccionado && gestorSeleccionado.nomepeca} ?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={() => peticionDelete()}>
                Sim
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => abrirCerrarModalEliminar()}
              >
                Não
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
      </>
  );
}
