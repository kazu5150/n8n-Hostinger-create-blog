// 修正されたParse AI Responseノードのコード
const input = $input.first();
console.log('Input data:', JSON.stringify(input, null, 2));

// OpenAIレスポンスの形式を確認
let aiResponse = '';

// 複数のレスポンス形式に対応
if (input.json && input.json.choices && input.json.choices[0]) {
  // 標準的なOpenAI APIレスポンス
  aiResponse = input.json.choices[0].message.content;
} else if (input.json && input.json.content) {
  // 別の形式のレスポンス
  aiResponse = input.json.content;
} else if (input.json && typeof input.json === 'string') {
  // 文字列レスポンス
  aiResponse = input.json;
} else {
  // フォールバック
  aiResponse = JSON.stringify(input.json);
}

console.log('AI Response:', aiResponse);

const lines = aiResponse.split('\n');
let title = '';
let content = '';
let foundTitle = false;

for (const line of lines) {
  if (line.startsWith('タイトル:')) {
    title = line.replace('タイトル:', '').trim();
    foundTitle = true;
  } else if (foundTitle && line.trim() !== '') {
    content += line + '\n';
  }
}

// タイトルが見つからない場合の処理
if (!title) {
  // 最初の行をタイトルとして使用
  const firstLine = lines[0] || 'タイトルなし';
  title = firstLine.replace(/^#+\s*/, '').trim(); // Markdownのヘッダー記号を削除
  content = lines.slice(1).join('\n').trim();
}

const result = {
  title: title || 'AI生成ブログ',
  content: content.trim() || aiResponse,
  theme: $node["Webhook"].json.body.theme
};

console.log('Parsed result:', result);

return result;