import {test, expect, request} from '@playwright/test';

test('CT01 - Consultar Dom Casmurro', async({request}) => {
    
    const resposta = await request.get('/api/livros/1');
    expect(resposta.status()).toBe(200);

    const livro = await resposta.json();

    expect(livro.titulo).toBe('Dom Casmurro')

    expect(livro.disponivel).toBe(true);

})


test('CT-02 cadastrar e excluir um livro como administrador', async ({ request }) => {

    const login = await request.post('/api/auth/login', {
        data: {
            email: 'admin@biblioteca.com',
            senha: 'Admin@123'
        }
    });

    expect(login.status()).toBe(200);

    const dadosLogin = await login.json();
    const token = dadosLogin.token;

    const cadastro = await request.post('/api/livros', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            titulo: 'Livro Teste',
            autor: 'Autor Breno',
            isbn: '9781234567897',
            anoPublicacao: 2024,
            quantidade: 2
        }
    });

    expect(cadastro.status()).toBe(201);

    const livro = await cadastro.json();

    expect(livro.id).toBeTruthy();
    expect(livro.titulo).toBe('Livro Teste');
    expect(livro.autor).toBe('Autor Breno');
    expect(livro.isbn).toBe('9781234567897');
    expect(livro.anoPublicacao).toBe(2024);
    expect(livro.quantidade).toBe(2);

    const exclusao = await request.delete(`/api/livros/${livro.id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    expect(exclusao.status()).toBe(204);

});

test('CT-03 Não permitir o cadastramento de livro sem token', async({request}) =>{

    const cadastro = await request.post('/api/livros', {
        data:{
             titulo: 'Livro Sem Token',
            autor: 'Autor Teste',
            isbn: '9781234567898',
            anoPublicacao: 2024,
            quantidade: 1
        }
    });

    expect(cadastro.status()).toBe(401);
    const erro = await cadastro.json();

    expect(erro.erro).toBeTruthy();
    expect(erro.status).toBe(401);
});


test('CT-04 Impedir empréstimo de livro indisponível', async ({ request }) => {

    const login = await request.post('/api/auth/login', {
        data: {
            email: 'leitor@biblioteca.com',
            senha: 'Leitor@123'
        }
    });

    expect(login.status()).toBe(200);

    const dadosLogin = await login.json();
    const token = dadosLogin.token;

    const emprestimo = await request.post('/api/emprestimos', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            livroId: 4
        }
    });

    expect(emprestimo.status()).toBe(409);

    const erro = await emprestimo.json();

    expect(erro.erro).toBe('Livro indisponível');
    expect(erro.status).toBe(409);

});
