export default function generateEndCampagainEmail(data) {
  // !--formato do objeto data desse email
  // const data = {
  //   cliNomeAbv: 'teste',
  //   campCod: 'teste',
  //   campDesc: 'teste',
  //   colabNome: 'teste',
  //   dataContato: 'teste',
  //   detalhes: 'teste',
  // };
  // --!
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Prospecção Finalizada</title>
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
                                              <img src="https://media.licdn.com/dms/image/C4D0BAQEYDwElKg_fCw/company-logo_200_200/0?e=2159024400&amp;v=beta&amp;t=fIbXYMco9rDfhBLu1BG5OxKZCGtmEeOQL_ZWnGvUkg8" alt="Aidera Tecnologia" width="100" height="100" style="display: block; float: right;" />&nbsp; &nbsp;
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                                  <table border="0" cellpadding="0" cellspacing="0">
                                      <tbody>
                                          <tr>
                                              <td style="color: #595959; font-family: Segoe UI Light; background-color: #ffffff; width: 960px; height: 20px; text-align: left;"> Empresa: <strong>${data.cliNomeAbv}</strong>.<br><br>

                                          </tr>
                                          <tr>
                                              <td style="color: #595959; font-family: Segoe UI Light; background-color: #ffffff; width: 960px; height: 20px; text-align: left;"> Campanha: <strong>${data.campCod} - ${data.campDesc}</strong>.<br><br>

                                          </tr>
                                          <tr>
                                              <td style="color: #595959; font-family: Segoe UI Light; background-color: #ffffff; width: 960px; height: 20px; text-align: left;"> Responsável: <strong> ${data.colabNome}</strong>.<br><br>

                                          </tr>
                                          <tr>
                                              <td style="color: #595959; font-family: Segoe UI Light; background-color: #ffffff; width: 960px; height: 20px; text-align: left;"> Data: <strong>${data.dataContato}</strong>.<br><br>

                                          </tr>
                                          <tr>
                                              <td style="color: #595959; font-family: Segoe UI Light; background-color: #ffffff; width: 960px; height: 20px; text-align: left;"> Motivo: <strong> ${data.detalhes} </strong>.<br>

                                          </tr>
                                      </tbody>
                                  </table>
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                      <tbody>
                                          <tr>
                                              <td style="padding: 0px; background-color: #fff;">
                                                  <p style="color: #595959; font-family: Segoe UI Light; background-color: #ffffff; text-align: left;"><strong>Equipe Comercial Aidera.</strong></p>
                                              </p>
                                          </tr>
                                      </tbody>
                                  </table>


                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                  <tbody>
                                                      <tr>
                                                          <td align="left" style="color: #000; font-family: Arial, sans-serif; font-size: 10px; width: 100%;">
                                                          &copy; Copyright Aidera Tecnologia 2021. Todos os direitos reservados<br />
                                                          </td>
                                                          <td align="center" style="padding: 20px;">
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 30px 0px 1px;">
                                      <tbody>
                                          <tr>
                                              <td style="color: #888888; font-family: Segoe UI Light; text-align: center;"><span style="background-color: #ffffff; font-family: Segoe UI Light; font-size: 13px; color: #153643;">N&atilde;o se deixem vencer pelo mal, mas ven&ccedil;am o mal com o bem.</span></td>
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
