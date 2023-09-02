// check-commit-message.js
const child_process = require('child_process');

// 현재 브랜치 이름 가져오기
const currentBranch = child_process.execSync('git branch --show-current').toString().trim();

// 브랜치 이름에서 CLICKUP- 뒤의 숫자 추출 (예: CLICKUP-1234 -> 1234)
const branchNumberMatch = currentBranch.match(/CLICKUP-(\d+)/);

if (!branchNumberMatch) {
  console.error('브랜치 이름에 CLICKUP- 뒤에 숫자가 없습니다.');
  process.exit(1); // 커밋을 막음
}

const branchNumber = branchNumberMatch[1];

// 최근 커밋 메시지 가져오기
const lastCommitMessage = child_process.execSync('git log -1 --pretty=%B').toString().trim();

// 커밋 메시지에 숫자가 포함되어 있지 않으면 커밋 거부
if (!lastCommitMessage.includes(branchNumber)) {
  console.error(`커밋 메시지에 브랜치 숫자(${branchNumber})가 포함되지 않았습니다.`);
  process.exit(1); // 커밋을 막음
}
