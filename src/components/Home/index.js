import axios from 'axios';
import React, { Fragment, useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

export default function Home() {
  const [pessoas, setPessoas] = useState([]);
  const [user, setUsers] = useState({
    nome: '',
    email: '',
  });

  useEffect(() => {
    axios.get('https://devwebapireact.eduardogoncalv5.repl.co')
      .then(res => {
        const dadosPessoas = res.data;
        setPessoas(dadosPessoas);
      });
  }, []);

  function enviarDadosAtualizados() {
    const url = 'https://devwebapireact.eduardogoncalv5.repl.co'; // Substitua pela sua URL de API

    const dadosAtualizados = {
      email: user.email,
      nome: user.nome,
    };

    axios.post(url, dadosAtualizados)
      .then(response => {
        console.log('Dados atualizados com sucesso:', response.data);
        // Realize outras ações de acordo com sua necessidade após a atualização bem-sucedida
      })
      .catch(error => {
        console.error('Erro ao atualizar os dados:', error);
        // Lide com o erro de acordo com sua necessidade
      });
  }

  function excluirInformacao(id) {
    const url = `https://devwebapireact.eduardogoncalv5.repl.co/${id}`; // Substitua pela sua URL de API

    axios.delete(url)
      .then(response => {
        console.log(`Informação com o ID ${id} excluída com sucesso`);
        // Realize outras ações de acordo com sua necessidade após a exclusão bem-sucedida
      })
      .catch(error => {
        console.error(`Erro ao excluir a informação com o ID ${id}`, error);
        // Lide com o erro de acordo com sua necessidade
      });
  }

  const atualizaNome = (event) => {
    setUsers((prevUsers) => ({
      ...prevUsers,
      nome: event.target.value,
    }));
  };

  const atualizaEmail = (event) => {
    setUsers((prevUsers) => ({
      ...prevUsers,
      email: event.target.value,
    }));
  };

  function submit() {
    const pessoa = {
      nome: user.nome,
      email: user.email,
    };

    // Faça a chamada ao axios.post ou axios.put para enviar os dados atualizados
    // Você pode usar a lógica similar à função enviarDadosAtualizados()
  }

  return (
    <Fragment>
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="name" value={user.nome} onChange={atualizaNome} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" value={user.email} onChange={atualizaEmail} />
          </Form.Group>

          <Button variant="primary" onClick={enviarDadosAtualizados}>
            Submit
          </Button>
        </Form>
      </div>

      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            <h1>Dados da API</h1>
            {pessoas.map((pessoa) => (
              <tr key={pessoa.id}>
                <td>{pessoa.nome}</td>
                <td>{pessoa.email}</td>
                <td>
                  <Button variant="primary" onClick={() => excluirInformacao(pessoa.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div></div>
    </Fragment>
  );
}
