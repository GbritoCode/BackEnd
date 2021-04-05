import Notifications from '../../schemas/notifications';

class NotificationController {
  async index(req, res) {
    const notifications = await Notifications.find({
      colab: req.params.colabId,
    }).sort({ createdAt: 'desc' });

    return res.json(notifications);
  }

  async update(req, res) {
    const notifications = await Notifications.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true },
    ).sort({ createdAt: 'desc' });

    return res.json(notifications);
  }
}
export default new NotificationController();
