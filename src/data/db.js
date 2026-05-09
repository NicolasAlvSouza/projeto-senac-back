// db.js — "banco" em memória
// arrays simulam tabelas; contadores guardam o próximo id de cada recurso.
// usar contador (e não array.length) evita reuso de id após exclusões.

export const usuarios = [
  {
    id: 1,
    nome: 'Buba',
    email: 'buba@example.com',
    telefone: '27999999999',
    senha: '123456' // sem hash propositalmente — apenas para fins didáticos
  }
];

export const tarefas = [
  { id: 1, titulo: 'Estudar Node', concluida: false, usuarioId: 1 }
];

// objeto centralizando os próximos ids de cada coleção
export const contadores = {
  usuarios: 2,
  tarefas: 2
};
