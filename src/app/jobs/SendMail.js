import Mail from '../../lib/Mail';

class SendMail {
  get key() {
    return 'SendMail';
  }

  async handle({ data }) {
    const { appointment } = data;
    // console.log('A fila');
    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Title',
      // text: 'text',
      template: 'template',
      context: {},
    });
  }
}

export default new SendMail();
