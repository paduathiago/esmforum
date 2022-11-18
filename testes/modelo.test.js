const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});

test('Testando get_respostas', () => {
  modelo.cadastrar_pergunta('Qual é a principal desvantagem de um singleton?');
  modelo.cadastrar_resposta(1, 'Ele pode ser usado para camuflar a criação de variáveis e estruturas de dados globais.');
  modelo.cadastrar_pergunta('Qual é a linguagem orientada a objetos mais utilizada atualmente?');
  modelo.cadastrar_resposta(2, 'C++');
  modelo.cadastrar_resposta(2, 'Java');
  const respostas = modelo.get_respostas(2)
  expect(respostas.length).toBe(2)
  expect(respostas[0].texto).toEqual('C++');
  expect(respostas[0].id_pergunta).toBe(respostas[1].id_pergunta)
});

test('Testando cadastro de três respostas', () => {
  modelo.cadastrar_pergunta('Como acessar o id da pergunta?');
  modelo.cadastrar_resposta(1, 'Ainda não descobri!');
  modelo.cadastrar_resposta(1, 'Estou buscando a resposta online. Se achar algo, informo');
  modelo.cadastrar_resposta(1, 'Mesma dúvida aqui!');
  const respostas = modelo.get_respostas(1)
  expect(respostas.length).toBe(3)
  expect(respostas[0].texto).toEqual('Ainda não descobri!');
  expect(respostas[1].texto).toEqual('Estou buscando a resposta online. Se achar algo, informo');
  expect(respostas[2].id_pergunta).toBe(respostas[1].id_pergunta)
});

/*test('Testando get_pergunta', () => {
  modelo.cadastrar_pergunta('Como acessar o id da pergunta?');
  pergunta = modelo.get_pergunta(1)
  expect(pergunta.texto).toEqual('Como acessar o id da pergunta?');
});*/
