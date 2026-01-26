const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directory = './images'; // 이미지가 있는 폴더

fs.readdir(directory, (err, files) => {
    if (err) return console.log('폴더를 찾을 수 없음:', err);

    files.forEach(file => {
        const filePath = path.join(directory, file);
        const fileName = path.parse(file).name;
        const ext = path.parse(file).ext.toLowerCase();

        // jpg, jpeg, png 파일만 찾아서 webp로 변환
        if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
            sharp(filePath)
                .webp({ quality: 75 }) // 화질 75% 설정 (눈으로 구분 잘 안됨, 용량은 대폭 감소)
                .toFile(path.join(directory, `${fileName}.webp`))
                .then(() => {
                    console.log(`[변환 완료] ${file} -> ${fileName}.webp`);
                    // 원본 삭제하고 싶으면 아래 주석 해제 (위험하니 추천하진 않음)
                    // fs.unlinkSync(filePath); 
                })
                .catch(err => console.error('에러 발생:', err));
        }
    });
});