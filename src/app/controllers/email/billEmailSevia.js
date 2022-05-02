export default function generateBillEmailSevia(data) {
  // !--formato do objeto data desse email
  // const data = {
  //   codOport: 'teste',
  //   descOport: 'teste',
  //   parcelasOport: 'teste',
  //   vlrParcelaOport: 'teste',
  //   dtVencParcela: 'teste',
  //   NFeParcela: 'teste',
  //   pedidoCliOport: 'teste',
  // };
  // --!
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Faturamento</title>
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
                                  <td align="center" style="color: #f27649; font-size: 40px; font-weight: bold; font-family: Arial, sans-serif; background-color: #f27649; height: 60px;">
                                  Sevia Plus Tecnologia
                                  <table border="0" cellpadding="0" cellspacing="0">
                                      <tbody>
                                          <tr>
                                              <td align="center" style="color: #888888; font-family: Segoe UI Light; font-size: 14px; background-color: #ffffff; width: 800px; height: 30px;">
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
                                              <td align="left" valign="top" style="color: #f27649; font-family: Arial, sans-serif; background-color: #ffffff; width: 900px; height: 40px; padding: 5px 0px 5px 20px;">
                                              <span style="font-size: 24px;">
                                                  <strong><span style="font-size: 35px; color: #737373;">FATURAMENTO </span> <br/>DE SERVIÇOS</strong></span>
                                              </td>
                                              <td>
                                              <img src="https://seviaplus.com.br/storage/images/logosevia.png" alt="Sevia Plus Tecnologia" width="200" height="55" style="display: block; padding: 5px 30px 10px 10px; float: right;" />&nbsp; &nbsp;
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                                  <table border="0" cellpadding="0" cellspacing="0">
                                      <tbody>

                                          <tr>
                                              <td style="color: #595959; font-family: Segoe UI Light; background-color: #ffffff; width: 960px; height: 30px; text-align: center;"><span style="font-size: 15px;">Prezado Cliente, segue anexo nossa nota fiscal de servi&ccedil;os relacionada ao uso do software Sevia Plus. Pedimos que envie a mesma para procedimentos de recebimento e pagamento. Para mais detalhes entre em contato conosco.</span><br />
                                              <span style="font-size: 10px;">Equipe de Atendimento Sevia.</span></td>
                                          </tr>

                                      </tbody>
                                  </table>
                  </br>
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
                                                                      <td align="center" style="color: #ffffff; padding: 2px 0px; font-family: Segoe UI Light; font-size: 16px; line-height: 20px; background-color: #f27649;">
                                                                      Detalhamento da Fatura</td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                          <br />
                                                          <table style="solid #cccccc; border-image: none; width: 100%;" cellspacing="0">
                                                              <tbody>
                                                                  <tr>
                                                                      <td style="color: #153643; line-height: 20px; font-family: Segoe UI Light; font-size: 14px; background-color: #fdede7;">&nbsp;C&oacute;digo Proposta</td>
                                                                      <td style="color: #153643; line-height: 20px; font-family: Segoe UI Light; font-size: 14px; background-color: #fdede7;" colspan="3">${data.codOport}</td>
                                                                  </tr>
                                                                  <tr>
                                                                      <td style="color: #153643; font-family: Segoe UI Light; font-size: 14px; line-height: 20px;">&nbsp;Descri&ccedil;&atilde;o Proposta</td>
                                                                      <td style="color: #153643; font-family: Segoe UI Light; font-size: 14px; line-height: 20px;" colspan="3">
                                                                      ${data.descOport}</td>
                                                                  </tr>
                                                                  <tr>
                                                                      <td style="color: #153643; line-height: 20px; font-family: Segoe UI Light; font-size: 14px; background-color: #fdede7;"><span style="font-size: 14px; font-family: Segoe UI Light; color: #153643;">&nbsp;Parcela</span></td>
                                                                      <td style="color: #153643; line-height: 20px; font-family: Segoe UI Light; font-size: 14px; background-color: #fdede7;" colspan="3">
                                                                      <span style="font-size: 14px; font-family: Segoe UI Light; color: #153643;">${data.parcelasOport}</span></td>
                                                                  </tr>
                                                                  <tr>
                                                                      <td style="color: #153643; font-family: Segoe UI Light; font-size: 14px; line-height: 20px;">&nbsp;Valor Parcela</td>
                                                                      <td style="color: #153643; font-family: Segoe UI Light; font-size: 14px; line-height: 20px;" colspan="3"><span style="font-size: 14px; background-color: #ffffff; font-family: Segoe UI Light; color: #153643;">R$ ${data.vlrParcelaOport}</span></td>
                                                                  </tr>
                                                                  <tr>
                                                                      <td style="color: #153643; line-height: 20px; font-family: Segoe UI Light; font-size: 14px; background-color: #fdede7;">&nbsp;Data Vencimento</td>
                                                                      <td style="color: #153643; line-height: 20px; font-family: Segoe UI Light; font-size: 14px; background-color: #fdede7;" colspan="3">${data.dtVencParcela}<br />
                                                                      </td>
                                                                  </tr>
                                                                  <tr>
                                                                      <td style="color: #153643; font-family: Segoe UI Light; font-size: 14px; line-height: 20px;">&nbsp;NFS-e</td>
                                                                      <td style="color: #153643; font-family: Segoe UI Light; font-size: 14px; line-height: 20px;" colspan="3"><span style="font-size: 14px; background-color: #ffffff; font-family: Segoe UI Light; color: #153643;">${data.NFeParcela}</span></td>
                                                                  </tr>
                                                                  <tr>
                                                                      <td style="color: #153643; line-height: 20px; font-family: Segoe UI Light; font-size: 14px; background-color: #fdede7;">&nbsp;Pedido</td>
                                                                      <td style="color: #153643; line-height: 20px; font-family: Segoe UI Light; font-size: 14px; background-color: #fdede7;" colspan="3">${data.pedidoCliOport}<br />
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
                                                          <table style="padding: 20px 0px; border=;" cellpadding="0" cellspacing="0" width="100%">
                                                              <tbody>
                                                                  <tr>
                                                                      <td valign="top" style="width: 260px;">
                                                                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                          <tbody>
                                                                              <tr>
                                                                                  <td align="center">
                                          <a href="https://www.seviaplus.com.br" target="_blank" style="color: #ffffff;">
                                                                                  <img width="145" height="60" style="display: block; border-width: 0px; border-style: solid; background: #fdede7; border-radius: 20px 20px 20px; padding: 11px 2px 11px;" alt="SeviaPlus" src="https://www.aidera.com.br/yl/wp-content/uploads/2021/05/Sevia_supply.png"  style="display: block;" />
                                          </a>
                                                                                  </td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td style="padding: 18px 0px 0px; color: #153643; font-family: Segoe UI Light; font-size: 14px; line-height: 20px; text-align: center;">
                                                                                  <span style="background-color: #ffffff; font-family: Segoe UI Light; font-size: 14px; color: #153643;">Quer acelerar seu processo de cotações e  mantê-los  sempre auditáveis? Não desperdice seu tempo com controles ineficientes. Com Sevia Supply seus fornecedores respondem as cotações direto na web e o seu comprador tem todas as rotinas de compras gerenciadas pelo portal. Fale com a gente!</span></td>
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
                                          <a href="https://app.tovoit.com.br/login" target="_blank" style="color: #ffffff;">
                                                                                  <img width="130" height="58" style="display: block; border-width: 0px; border-style: solid; background: #ff944d; border-radius: 20px 20px 20px; padding: 11px 10px 11px;" alt="TovoiT" src="https://www.aidera.com.br/yl/wp-content/uploads/2021/05/tovoLogo.png"  style="display: block;" />
                                          </a>
                                                                                  </td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td style="padding: 20px 0px 0px; color: #153643; font-family: Segoe UI Light; font-size: 14px; line-height: 20px; text-align: center;">Você precisa de um sistema simples para gestão de serviços? Agora você tem. Como o Tovo sua empresa de serviços vai mapear e desenvolver oportunidades através do nosso CRM, registrar despesas, horas trabalhadas, pagamentos e faturas. Quer saber mais? Agende agora uma demonstração com a nossa equipe!</td>
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
                                          <a href="https://www.seviaplus.com.br" target="_blank" style="color: #ffffff;">
                                                                                  <img width="140" height="65" style="display: block; border-width: 0px; border-style: solid; background: #fdede7; border-radius: 20px 20px 20px; padding: 8px 2px 8px;" alt="SeviaPlus" src="https://www.aidera.com.br/yl/wp-content/uploads/2021/05/Sevia_docs.png"  style="display: block;" />
                                          </a>
                                                                                  </td>
                                                                              </tr>
                                                                              <tr>
                                                                                  <td style="padding: 18px 0px 0px; color: #153643; font-family: Segoe UI Light; font-size: 14px; line-height: 20px; text-align: center;">
                                                                                  <span style="background-color: #ffffff; font-family: Segoe UI Light; font-size: 14px; color: #153643;">O Sevia Plus é o caminho mais rápido para empresas que precisam inovar. Com ele seus clientes têm acesso à informações como: pedidos, boletos, notas fiscais e outros documentos através do nosso portal, chats ou chatbots. Interessado em saber como funciona? Agende uma reunião com nossa equipe agora mesmo!</span></td>
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
                                              <td style="padding: 20px; background-color: #f27649;">
                                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                  <tbody>
                                                      <tr>
                                                          <td style="color: #ffffff; font-family: Arial, sans-serif; font-size: 10px; width: 75%;">
                                                          &copy; Copyright Sevia Plus 2022. Todos os direitos reservados<br />
                                                          </td>
                                                          <td align="right" style="width: 25%;">
                                                          <table border="0" cellpadding="0" cellspacing="0">
                                                              <tbody>
                                                                  <tr>
                                                                      <td style="color: #f27649; width: 20px; font-weight: bold;">
                                                                      <a href="https://www.facebook.com/AideraTecno/" style="color: #ffffff;">
                                                                      <img width="22" height="22" alt="Facebook" src="https://www.aidera.com.br/yl/wp-content/uploads/2021/05/IconeFace.png" />
                                                                      </a>
                                                                      </td>
                                                                      <td style="color: #f27649; width: 20px;"></td>
                                                                      <td style="font-family: Segoe UI Light; font-size: 12px; font-weight: bold;">
                                                                      <a href="https://www.instagram.com/aideratecno" style="color: #ffffff;">
                                                                      <img width="28" height="28" alt="Instagram" src="https://www.aidera.com.br/yl/wp-content/uploads/2021/05/IconeInsta.png" />
                                                                      </a>
                                                                      </td>
                                                                      <td style="color: #f27649; width: 20px;"></td>
                                                                      <td style="font-family: Segoe UI Light; font-size: 12px; font-weight: bold;">
                                                                      <a href="https://pt.linkedin.com/company/aidera-tecnologia-empresarial" style="color: #ffffff;">
                                                                      <img width="22" height="22" alt="Linkedin" src="https://www.aidera.com.br/yl/wp-content/uploads/2021/05/IconeLinked.png" />
                                                                      </a>
                                                                      </td>
                                                                      <td style="color: #f27649; width: 20px;"></td>
                                                                      <td style="font-family: Segoe UI Light; font-size: 12px; font-weight: bold;">
                                                                      <a href="https://www.youtube.com/channel/UCxG8DpPWcodg43V60UF6axw" style="color: #ffffff;">
                                                                      <img width="32" height="36" alt="Youtube" src="https://www.aidera.com.br/yl/wp-content/uploads/2021/05/IconeYoutub.png" />
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
