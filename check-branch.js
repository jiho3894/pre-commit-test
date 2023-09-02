// check-branch.js
const child_process = require('child_process');

// 현재 브랜치 이름 가져오기
const currentBranch = child_process.execSync('git branch --show-current').toString().trim();

// 브랜치 이름에서 숫자 추출 (예: apple/test-12 -> 12)
const branchNumber = currentBranch.match(/\d+/);

// 숫자가 없거나 특정 범위 내에 없을 경우 커밋 거부
if (!branchNumber || parseInt(branchNumber[0]) < 1 || parseInt(branchNumber[0]) > 10) {
  console.error('브랜치 이름에 특정 숫자 범위(1에서 10 사이)가 없습니다.');
  process.exit(1); // 커밋을 막음
}
