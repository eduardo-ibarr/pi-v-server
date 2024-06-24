import { Request, Response } from 'express';
import { db } from '../../../providers/database/mysql-provider';

export const getPendingPurchases = async (req: Request, res: Response) => {
  try {
    const rows = await db.query(`
      SELECT reservations.id, reservations.total_amount, reservations.reservation_timestamp, users.email as userEmail
      FROM reservations
      JOIN users ON reservations.user_id = users.id
      WHERE reservations.status = 'pending'
    `);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar compras pendentes', error });
  }
};

export const updatePurchaseStatus = async (req: Request, res: Response) => {
  const { purchaseId } = req.params;
  const { status } = req.body;

  try {
    const result = await db.query(`
      UPDATE reservations
      SET status = ?
      WHERE id = ?
    `, [status, purchaseId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Compra não encontrada' });
    }

    res.status(200).json({ message: 'Status da compra atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o status da compra', error });
  }
};
