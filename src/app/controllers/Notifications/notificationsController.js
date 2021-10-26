import { differenceInDays } from 'date-fns';
import Notifications from '../../models/notifications';

class NotificationController {
  async index(req, res) {
    try {
      let notifications = await Notifications.findAll({
        where: {
          ColabId: req.params.colabId,
        },
        order: [['createdAt', 'DESC']],
      });
      notifications = notifications.filter((notify) => (
        !notify.read
        || (notify.read && differenceInDays(new Date(), notify.createdAt) < 6)
      ));
      return res.json(notifications);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }

  async update(req, res) {
    try {
      const notifications = await Notifications.findByPk(req.params.id);
      const updated = await notifications.update({ read: true });
      return res.json({ notidication: updated, message: 'Notificação marcada como lida' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro Interno do Servidor' });
    }
  }
}
export default new NotificationController();
