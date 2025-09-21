const { readFileSync, writeFileSync } = require('fs');
try{
    console.log(readFileSync("./testing.txt", "utf8"));
} catch {
    writeFileSync("./testing.txt", "File created!", {flag: "a"});
}