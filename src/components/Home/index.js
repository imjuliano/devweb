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
    fetchPessoas();
  }, []);

  function fetchPessoas() {
    axios.get('https://devwebapireact.eduardogoncalv5.repl.co')
      .then(res => {
        const dadosPessoas = res.data;
        setPessoas(dadosPessoas);
      })
      .catch(error => {
        console.error('Erro ao buscar as pessoas:', error);
      });
  }

  function enviarDadosAtualizados() {
    const url = 'https://devwebapireact.eduardogoncalv5.repl.co';

    const dadosAtualizados = {
      email: user.email,
      nome: user.nome,
    };

    axios.post(url, dadosAtualizados)
      .then(response => {
        console.log('Dados atualizados com sucesso:', response.data);
        const novaPessoa = response.data; // Novo objeto adicionado à API
        setPessoas([...pessoas, novaPessoa]); // Adiciona a nova pessoa à lista
        setUsers({
          nome: '',
          email: '',
        }); // Limpa os campos de input
        fetchPessoas(); // Busca novamente os dados atualizados da API
      })
      .catch(error => {
        console.error('Erro ao atualizar os dados:', error);
      });
  }

  function excluirInformacao(id) {
    const url = `https://devwebapireact.eduardogoncalv5.repl.co/${id}`;

    axios.delete(url)
      .then(response => {
        console.log(`Informação com o ID ${id} excluída com sucesso`);
        const novaListaPessoas = pessoas.filter(pessoa => pessoa.id !== id);
        setPessoas(novaListaPessoas);
      })
      .catch(error => {
        console.error(`Erro ao excluir a informação com o ID ${id}`, error);
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1>Formulário de Cadastro</h1>
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

      <div style={{ marginBottom: '20px' }}>
        <h1>Dados da API</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
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
    </div>
  );
}
