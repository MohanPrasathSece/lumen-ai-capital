const fs = require('fs');
const files = [
  'src/pages/Terms.tsx',
  'src/pages/PrivacyPolicy.tsx',
  'src/pages/LoggedIn.tsx',
  'src/pages/Landing.tsx',
  'src/lib/crm.ts',
  'src/components/auth-modal.tsx',
  'index.html',
  'api/auth/signup.ts'
];
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/Lumen Capital Technologies, Inc\./g, 'The Market Vault');
  content = content.replace(/lumen\.app/g, 'themarketvault.app');
  content = content.replace(/Lumen's/g, "The Market Vault's");
  content = content.replace(/Lumen/g, 'The Market Vault');
  content = content.replace(/lumen_beta_timer/g, 'market_vault_beta_timer');
  content = content.replace(/lumen_modal_timer/g, 'market_vault_modal_timer');
  fs.writeFileSync(f, content);
});
console.log('Done');
