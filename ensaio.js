const { chromium } = require('playwright');

(async () => {
  // 1. O diretor chama o palco: Iniciando o navegador
  console.log('🎭 Abrindo as cortinas...');
  const browser = await chromium.launch({ headless: false }); // headless: false nos deixa ver o que está acontecendo!
 
  // 2. Criando um contexto (como se fosse uma aba anônima limpinha)
  const context = await browser.newContext();
 
  // 3. Abrindo uma nova aba de fato
  const page = await context.newPage();

  // 4. A Ação: Indo para a página da Wikipedia
  console.log('🚀 Viajando para a Wikipedia...');
  await page.goto('https://pt.wikipedia.org');

  // 5. Tirando uma "foto" do palco (Screenshot)
  await page.screenshot({ path: 'wikipedia_foto.png' });
  console.log('📸 Foto tirada com sucesso!');

  // 6. Fechando as cortinas
  await browser.close();
  console.log('👋 Fim do ensaio!');
})();