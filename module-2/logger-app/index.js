const path = require('path');
const fs = require('fs');

const inputArguments = process.argv.slice(2);
const text = inputArguments.join(" ");
const timeStame = new Date().toISOString();
const message = `${text} ${timeStame} \n`;
// console.log(timeStame)

const pathName = path.join(__dirname, "log.txt");

if (!message) {
    console.log("❌ Please Provide a message to log")
    console.log("Example : node index.js hello world")
    process.exit(1);
}

fs.appendFile(pathName, message, { encoding: "utf-8" }, () => {
    console.log('Appended successfully')
})
