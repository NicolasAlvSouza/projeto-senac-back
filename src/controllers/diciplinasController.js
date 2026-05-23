import { getDatabase } from '../data/db.js'

export async function listar(req, res) {
    
  try {
      const db = await getDatabase();
      const diciplinas = await db.all(
        'SELECT id, titulo, professor FROM tarefas ORDER BY id'
      );
      res.json(diciplinas);
    } catch (erro) {
      console.error('[diciplinas.listar]', erro);
      res.status(500).json({ mensagem: 'Erro ao buscar diciplinas.' });
    }
}