export default function generateReviewEmail(data) {
  // !--formato do objeto data desse email
  // const data = {
  //   codOport: 'teste',
  //   descOport: 'teste',
  //   parcelasOport: 'teste',
  //   vlrLiqOport: 'teste',
  //   cotacaoDesc: 'teste',
  // };
  // --!
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Revisao Proposta</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin: 0; padding: 0;" class="vsc-initialized">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td style="padding: 10px 0 20px 0;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="860" style="border: 1px solid #cccccc; border-collapse: collapse;">
                        <tbody>
                            <tr>
                                <td align="center" style="color: #0071bc; font-size: 40px; font-weight: bold; font-family: Arial, sans-serif; background-color: #0071bc; height: 60px;">
                                Aidera Tecnologia Empresarial
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
                                <td style="padding: 1px 30px; background-color: #ffffff;">
                                <table border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td align="left" valign="top" style="color: #0071bc; font-family: Arial, sans-serif; background-color: #ffffff; width: 900px; height: 40px; padding: 5px 0px 5px 20px;">
                                            <span style="font-size: 24px;">
                                                <strong><span style="font-size: 35px; color: #333333;">REVISÃO PROPOSTA</span> <br/>COMERCIAL</strong></span>
                                            </td>
                                            <td>
                                            <img src="https://media.licdn.com/dms/image/C4D0BAQEYDwElKg_fCw/company-logo_200_200/0?e=2159024400&amp;v=beta&amp;t=fIbXYMco9rDfhBLu1BG5OxKZCGtmEeOQL_ZWnGvUkg8" alt="Aidera Tecnologia" width="100" height="100" style="display: block; padding: 5px 30px 10px 10px; float: right;" />&nbsp; &nbsp;
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td style="color: #595959; font-family: Arial, sans-serif; background-color: #ffffff; width: 960px; height: 30px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="color: #595959; font-family: Segoe UI Light; background-color: #ffffff; width: 960px; height: 30px; text-align: center;"><span style="font-size: 15px;">Prezado Cliente, segue para sua avalia&ccedil;&atilde;o nossa revis&atilde;o da proposta comercial destinada a realiza&ccedil;&atilde;o dos servi&ccedil;os abaixo. Para mais detalhes acesse o anexo enviado ou entre em contato conosco.</span><br />
                                            <span style="font-size: 10px;">Equipe de Atendimento Aidera.</span></td>
                                        </tr>
                                        <tr>
                                            <td style="color: #595959; font-family: Segoe UI Light; font-size: 15px; background-color: #ffffff; width: 960px; height: 30px;">&nbsp;</td>
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
                                                        <table width="100%" style="solid #cccccc; cellpadding=;" cellspacing="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="center" style="color: #ffffff; padding: 2px 0px; font-family: Segoe UI Light; font-size: 16px; line-height: 20px; background-color: #0071bc;">
                                                                    Detalhamento da Proposta</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <br />
                                                        <table style="solid #cccccc; border-image: none; width: 100%;" cellspacing="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="color: #153643; line-height: 20px; font-family: Segoe UI Light; font-size: 14px; background-color: #d8d8d8;">&nbsp;C&oacute;digo Proposta</td>
                                                                    <td style="color: #153643; line-height: 20px; font-family: Segoe UI Light; font-size: 14px; background-color: #d8d8d8;" colspan="3">${data.codOport}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="color: #153643; font-family: Segoe UI Light; font-size: 14px; line-height: 20px;">&nbsp;Descri&ccedil;&atilde;o Proposta</td>
                                                                    <td style="color: #153643; font-family: Segoe UI Light; font-size: 14px; line-height: 20px;" colspan="3">
                                                                    ${data.descOport}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="color: #153643; line-height: 20px; font-family: Segoe UI Light; font-size: 14px; background-color: #d8d8d8;"><span style="font-size: 14px; background-color: #d8d8d8; font-family: Segoe UI Light; color: #153643;">&nbsp;Valor Proposta</span></td>
                                                                    <td style="color: #153643; line-height: 20px; font-family: Segoe UI Light; font-size: 14px; background-color: #d8d8d8;" colspan="3">
                                                                    <span style="font-size: 14px; background-color: #d8d8d8; font-family: Segoe UI Light; color: #153643;">R$ ${data.vlrLiqOport}</span></td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="color: #153643; font-family: Segoe UI Light; font-size: 14px; line-height: 20px;">&nbsp;N&uacute;mero de Parcelas</td>
                                                                    <td style="color: #153643; font-family: Segoe UI Light; font-size: 14px; line-height: 20px;" colspan="3"><span style="font-size: 14px; background-color: #ffffff; font-family: Segoe UI Light; color: #153643;">${data.parcelasOport}</span></td>
                                                                </tr>
                                                                <tr>
                                                                    <td style="color: #153643; line-height: 20px; font-family: Segoe UI Light; font-size: 14px; background-color: #d8d8d8;">&nbsp;Pedido Cliente</td>
                                                                    <td style="color: #153643; line-height: 20px; font-family: Segoe UI Light; font-size: 14px; background-color: #d8d8d8;" colspan="3">${data.cotacaoDesc}<br />
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <br />
                                                        <table width="100%" class="reTableSelected" border="0" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td valign="top" style="width: 250px;">
                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                        </tbody>
                                                                    </table>
                                                                    </td>
                                                                    <td style="font-size: 0px; line-height: 0; width: 20px;">
                                                                    &nbsp;
                                                                    </td>
                                                                    <td valign="top" style="width: 250px;">
                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                        </tbody>
                                                                    </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                        <table style="padding: 30px 0px; border=;" cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td valign="top" style="width: 260px;">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center">
                                                                                <img alt="" src="https://www.aidera.com.br/yl/wp-content/uploads/2018/08/casa.png" style="display: block;" />
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style="padding: 20px 0px 0px; color: #153643; font-family: Segoe UI Light; font-size: 14px; line-height: 20px; text-align: center;">
                                                                                A sua empresa busca automatizar seus processos? Com a Aidera sua empresa tem uma solu&ccedil;&atilde;o pr&aacute;tica e inteligente para desenvolvimento de aplica&ccedil;&otilde;es de forma &aacute;gil, elevando suas equipes a um outro n&iacute;vel de competitividade e inova&ccedil;&atilde;o. O mundo digital mais perto da sua empresa. Fale com a gente!&nbsp;</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    </td>
                                                                    <td style="font-size: 0px; line-height: 0; width: 20px;">
                                                                    &nbsp;
                                                                    </td>
                                                                    <td valign="top" style="width: 260px;">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center">
                                                                                <img alt="" src="https://www.aidera.com.br/yl/wp-content/uploads/2018/08/homem.png" style="display: block;" />
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style="padding: 20px 0px 0px; color: #153643; font-family: Segoe UI Light; font-size: 14px; line-height: 20px; text-align: center;">A Aidera Tecnologia se empenha para levar at&eacute; voc&ecirc;, servi&ccedil;os de consultoria e suporte personalizados, aplicando para isso nossas habilidades em diferentes rotinas, com profissionais experientes na execu&ccedil;&atilde;o dos processos do ERP garantindo uma maior performance e produtividade.&nbsp;</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    </td>
                                                                    <td style="font-size: 0px; line-height: 0; width: 20px;">
                                                                    &nbsp;
                                                                    </td>
                                                                    <td valign="top" style="width: 260px;">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center">
                                                                                <img alt="" src="https://www.aidera.com.br/yl/wp-content/uploads/2018/08/grafico.png" style="display: block;" />
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style="padding: 20px 0px 0px; color: #153643; font-family: Segoe UI Light; font-size: 14px; line-height: 20px; text-align: center;">
                                                                                <span style="background-color: #ffffff; font-family: Segoe UI Light; font-size: 14px; color: #153643;">Quer acelerar seu processo de cota&ccedil;&otilde;es e&nbsp; mant&ecirc;-los&nbsp; sempre audit&aacute;veis? N&atilde;o desperdice seu tempo com controles ineficientes. Com IBID seus fornecedores respondem as cota&ccedil;&otilde;es direto na web e o seu comprador tem todas as rotinas de compras direto no portal. Fale com a gente!</span></td>
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
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 20px; background-color: #0071bc;">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td style="color: #ffffff; font-family: Segoe UI Light; font-size: 12px; width: 75%;">
                                                        &copy; Copyright Aidera 2018. Todos os direitos reservados<br />
                                                        </td>
                                                        <td align="right" style="width: 25%;">
                                                        <table border="0" cellpadding="0" cellspacing="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="color: #0071bc; width: 20px; font-weight: bold;">
                                                                    <a href="https://www.facebook.com/AideraTecno/" style="color: #ffffff;">
                                                                    <img width="28" height="28" style="display: block; border-width: 0px; border-style: solid;" alt="Twitter" src="https://leadershipmanagement.com.au/wp-content/uploads/2014/08/facebook-240x240.png" />
                                                                    </a>
                                                                    </td>
                                                                    <td style="color: #0071bc; width: 20px;">|</td>
                                                                    <td style="font-family: Segoe UI Light; font-size: 12px; font-weight: bold;">
                                                                    <a href="https://www.instagram.com/aideratecno" style="color: #ffffff;">
                                                                    <img width="24" height="24" style="display: block; border-width: 0px; border-style: solid;" alt="Instagram" src="https://cdn.clipart.email/504a80ec27a862831af6c64bc8851e01_instagram-png-branco-png-image_200-200.png" />
                                                                    </a>
                                                                    </td>
                                                                    <td style="color: #0071bc; width: 20px;">|</td>
                                                                    <td style="font-family: Segoe UI Light; font-size: 12px; font-weight: bold;">
                                                                    <a href="https://pt.linkedin.com/company/aidera-tecnologia-empresarial" style="color: #ffffff;">
                                                                    <img width="24" height="24" style="display: block; border-width: 0px; border-style: solid;" alt="Facebook" src="https://pnex.com.br/img/redes-linkedin.png" />
                                                                    </a>
                                                                    </td>
                                                                    <td style="color: #0071bc; width: 20px;">|</td>
                                                                    <td style="font-family: Segoe UI Light; font-size: 12px; font-weight: bold;">
                                                                    <a href="https://www.youtube.com/channel/UCxG8DpPWcodg43V60UF6axw" style="color: #ffffff;">
                                                                    <img width="30" height="32" style="display: block; border-width: 0px; border-style: solid;" alt="Youtube" src="https://otripulante.com/assets/images/redes/menu/youtube.png" />
                                                                    </a>
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
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 10px;">
                                    <tbody>
                                        <tr>
                                            <td style="color: #888888; font-family: Segoe UI Light; font-size: 14px; text-align: center;"><span style="font-size: 14px; background-color: #ffffff; font-family: Segoe UI Light; color: #153643;">N&atilde;o se deixem vencer pelo mal, mas ven&ccedil;am o mal com o bem.</span></td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="color: #888888; font-family: Segoe UI Light; font-size: 10px;"><span style="color: #262626;">
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
