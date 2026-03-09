const fs = require('fs');
const path = require('path');

const moduleDir = path.join(__dirname, 'frontend/src/data/modules');

function getFiles(dir, files = []) {
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const name = path.join(dir, file);
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files);
        } else if (name.endsWith('.js')) {
            files.push(name);
        }
    }
    return files;
}

const allFiles = getFiles(moduleDir);
const results = {
    totalFiles: allFiles.length,
    issues: []
};

allFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(moduleDir, filePath);

    // 1. Question Count
    const questionsMatch = content.match(/id:\s*["'][^"']+["']/g);
    const questionCount = questionsMatch ? questionsMatch.length : 0;

    // 2. MCQ Check
    const questionBlocks = content.split(/\{[\s\n]*id:\s*["']/);
    let missingD = false;
    let mcqCount = 0;

    questionBlocks.forEach(block => {
        if (block.includes('type: "mcq"') || block.includes("type: 'mcq'")) {
            mcqCount++;
            const optionsPart = block.split(/correctAnswer\s*:/)[0];
            const optionsMatch = optionsPart.match(/options:\s*([\s\S]+)/);

            if (optionsMatch) {
                const opt = optionsMatch[1].trim();
                if (opt.startsWith('{')) {
                    if (!opt.includes('D:') && !opt.includes('"D":')) missingD = true;
                } else if (opt.startsWith('[')) {
                    const items = opt.split(',').length;
                    if (items < 4) missingD = true;
                }
            } else {
                missingD = true;
            }
        }
    });

    if (questionCount !== 10 || missingD) {
        results.issues.push({
            file: relativePath,
            questionCount,
            mcqCount: mcqCount,
            missingD: missingD
        });
    }
});

fs.writeFileSync('audit_report.json', JSON.stringify(results, null, 2));
console.log(`Audit complete. Found issues in ${results.issues.length} files.`);
