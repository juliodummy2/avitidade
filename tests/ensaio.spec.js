const { test, expect } = require('@playwright/test');

// 🐢 O Toque de Mestre: Câmera lenta de 3000ms (3 segundos) para CADA ação do Playwright
test.use({ launchOptions: { slowMo: 3000 } });

test('Deve fazer login no SENAI, acessar o painel do aluno e buscar na estante virtual', async ({ page }) => {
 
  const urlLogin = 'https://identidade.senai.br/authenticationendpoint/login.do?RelayState=https%3A%2F%2Fmeusenai.senai.br%2F&commonAuthCallerPath=%2Fsamlsso&forceAuth=false&passiveAuth=false&tenantDomain=carbon.super&sessionDataKey=28315d24-1a0b-4b74-b293-960efcc11bb8&relyingParty=https%3A%2F%2Fmeusenai.senai.br&type=samlsso&sp=meusenai.senai.br&isSaaSApp=false&authenticators=BasicAuthenticator%3ALOCAL&#39'
 
  console.log('🎬 Iniciando a navegação (em câmera lenta)...');
  await page.goto(urlLogin);

  const inputEmail = page.locator('input[type="text"], input[name="username"], #username');
  const inputSenha = page.locator('input[type="password"], input[name="password"], #password');
 
  console.log('✍️ Inserindo e-mail e senha...');
  await inputEmail.fill('teste@aluno.com');
  await inputSenha.fill('123456');

  const botaoEntrar = page.getByRole('button', { name: /entrar|login|acessar/i });
  await botaoEntrar.click();

  console.log('🔄 Aguardando o redirecionamento pós-login...');
 
  const opcaoAluno = page.getByText('Aluno', { exact: true });
  await opcaoAluno.click();

  console.log('📖 Acessando a Estante Virtual...');

  const estanteVirtual = page.getByText('Estante Virtual', { exact: false });
  await estanteVirtual.click();

  const barraPesquisa = page.locator('input[type="search"], input[placeholder*="buscar"], input[placeholder*="pesquisar"]');
 
  console.log('🔍 Buscando pelo livro "Teste de Front-end"...');
  await barraPesquisa.fill('Teste de Front-end');
  await barraPesquisa.press('Enter');

  // Adicionando uma pausa manual APENAS no final para você conseguir admirar o resultado
  // antes que o navegador feche automaticamente (opcional, mas ótimo para aprendizado)
  console.log('👀 Pausa final para o aluno admirar a tela...');
  await page.waitForTimeout(5000);

  await page.screenshot({ path: 'resultado_busca_livro.png', fullPage: true });
  console.log('📸 Screenshot da busca salvo!');
});