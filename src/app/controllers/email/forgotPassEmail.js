export default function generateForgotPassEmail(data) {
  // !--formato do objeto data desse email
  // const data = {
  //   userName: 'teste',
  //   userPass: 'teste',
  // };
  // --!
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Recuperção De Senha</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="margin: 0; padding: 40px;" class="vsc-initialized">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                  <tr>
                      <td style="padding: 10px 0 10px 0;">
                      <table align="center" border="0" cellpadding="0" cellspacing="0" width="760" style="border: 1px solid #cccccc; border-collapse: collapse;">
                          <tbody>
                              <tr>
                                  <td align="center" style="color: #0071bc; font-size: 40px; font-weight: bold; font-family: Arial, sans-serif; background-color: #ffffff; height: 0px;">

                                  <table border="0" cellpadding="0" cellspacing="0">
                                      <tbody>
                                          <tr>
                                              <td align="center" style="color: #888888; font-family: Arial, sans-serif; font-size: 14px; background-color: #ffffff; width: 800px; height: 30px;">
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                                  </td>
                              </tr>
                              <tr>
                                  <td style="padding: 1px 50px; background-color: #ffffff;">
                                  <table border="0" cellpadding="0" cellspacing="0">
                                      <tbody>
                                          <tr>
                                              <td align="left" valign="top" style="color: #008afd; font-family: Arial, sans-serif; background-color: #ffffff; width: 900px; height: 20px; ">
                                              <span style="font-size: 18px;">
                                                  <strong><span style="font-size: 20px; color: #333333;">PROSPECÇÃO</span> <br/>FINALIZADA </strong></span>
                                              </td>
                                              <td>
                                              <img src="https://app.tovoit.com.br/favicon.ico" alt="Tovo" width="80" height="80" style="display: block; padding: 1px 0px 0px 1px; float: right;" />&nbsp; &nbsp;
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                                  <table border="0" cellpadding="0" cellspacing="0">
                                      <tbody>
                                          <tr>
                                              <td style="color: #595959; font-family: Segoe UI Light; background-color: #ffffff; width: 960px; height: 20px; text-align: left;"> Olá <strong>${data.userName}</strong>. <br> Foi solicitado uma alteração de senha para o seu usuário no aplicativo Tovo.<br />
            Caso não reconheça essa solicitação, entre em contato com o administrador do sistema.<br />
            Segue abaixo sua nova senha. Informe-a como senha atual e no primeiro login efetue a alteração.<br /><br />

                                          </tr>
                                      </tbody>
                                  </table>
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                      <tbody>
                                          <tr>
                                              <td>
                                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                  <tbody>
                                                      <tr>
                                                          <td valign="top" style="width: 260px;">
                                                          <table width="40%" style="solid #cccccc; cellspacing="0"; align="center">
                                                              <tbody>
                                                                  <tr>
                                                                      <td align="center" style="color: #ffffff; padding: 2px 0px; font-family: Segoe UI Light; font-size: 16px; line-height: 1px; background-color: #008afd;">
                                                                      <p><strong>${data.userPass}</strong></p>
                                                                      </td>
                                                                  </tr>

                                                              </tbody>
                                                          </table>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td>

                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                              </td>
                                          </tr>
                                          <tr>
                                              <td style="padding: 0px; background-color: #fff;">
                                                  <br><br><p style="color: #595959; font-family: Segoe UI Light; background-color: #ffffff; text-align: left;"><strong>Equipe Suporte Tovo.</strong></p>
                                              </p>
                                          </tr>
                                          <tr>
                                              <td align="left" style="color: #000; font-family: Arial, sans-serif; font-size: 10px; width: 100%;">
                                              &copy; Copyright Tovoit 2021. Todos os direitos reservados<br />
                                          </tr>
                                      </tbody>
                                  </table>

                                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 30px 0px 1px;">
                                      <tbody>
                                          <tr>
                                              <br><br><td style="color: #888888; font-family: Segoe UI Light; text-align: center;"><span style="background-color: #ffffff; font-family: Segoe UI Light; font-size: 13px; color: #153643;">N&atilde;o se deixem vencer pelo mal, mas ven&ccedil;am o mal com o bem.</span></td>
                                          </tr>
                                          <tr>
                                              <td align="center" style="color: #888888; font-family: Segoe UI Light; font-size: 10px;"><span style="color: #262626; ">
                                              Romanos 12:21</span>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      </td>
                  </tr>
              </tbody>
          </table>
      </body>
  </html>`;
}
