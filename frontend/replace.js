const fs = require('fs');

let content = fs.readFileSync('src/data/tutorials.tsx', 'utf-8');

// Insert import
if (!content.includes('import VisualPlayground from')) {
    content = content.replace(
        'import React from "react";',
        'import React from "react";\nimport VisualPlayground from "@/components/VisualPlayground";'
    );
}

function replaceCircuit(title, newContent) {
    const titleIndex = content.indexOf(`>\\n                  ${title}\\n                </h3>`);
    if (titleIndex === -1) {
        // Try alternate formatting
        const altIndex = content.indexOf(`{/*  ${title}  */}`);
        if (altIndex === -1) {
            console.log(`Could not find marker for ${title}`);
            return;
        }
        
        let startIdx = content.indexOf('<div', altIndex);
        if (startIdx === -1) return;
        
        let endIdx = findDivEnd(content, startIdx);
        content = content.slice(0, startIdx) + newContent + content.slice(endIdx);
        console.log(`Replaced ${title} (alt format)`);
        return;
    }

    let startIdx = content.indexOf('<div', titleIndex);
    if (startIdx === -1) return;

    let endIdx = findDivEnd(content, startIdx);
    content = content.slice(0, startIdx) + newContent + content.slice(endIdx);
    console.log(`Replaced ${title}`);
}

function findDivEnd(str, startIdx) {
    let depth = 0;
    let i = startIdx;
    
    while (i < str.length) {
        if (str.substring(i, i + 4) === '<div') {
            depth++;
            i += 4;
        } else if (str.substring(i, i + 6) === '</div') {
            depth--;
            i += 6;
            if (depth === 0) {
                // Find closing >
                while (str[i] !== '>' && i < str.length) i++;
                return i + 1;
            }
        } else {
            i++;
        }
    }
    return startIdx;
}

const bellCircuit = '<div style={{ marginTop: "16px" }}><VisualPlayground inlineMode initialNumQubits={2} initialGates={[["H", ""], ["CX_0", "CX_1"]]} /></div>';
const teleCircuit = '<div style={{ marginTop: "16px" }}><VisualPlayground inlineMode initialNumQubits={3} initialGates={[["", "H", ""], ["", "CX_0", "CX_1"], ["CX_0", "CX_1", ""], ["H", "", ""], ["", "", "CX_1"], ["", "CX_0", ""]]} /></div>';
const sdcCircuit = '<div style={{ marginTop: "16px" }}><VisualPlayground inlineMode initialNumQubits={2} initialGates={[["H", ""], ["CX_0", "CX_1"], ["", ""], ["", ""], ["CX_0", "CX_1"], ["H", ""]] } /></div>';

replaceCircuit("Example: Bell State Circuit", bellCircuit);
replaceCircuit("Bell State Circuit", bellCircuit);
replaceCircuit("Teleportation Circuit", teleCircuit);
replaceCircuit("Superdense Coding Circuit", sdcCircuit);

fs.writeFileSync('src/data/tutorials.tsx', content);
console.log("Done");
