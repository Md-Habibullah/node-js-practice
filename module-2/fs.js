const fs = require('fs');
// const { text } = require('stream/consumers');

// console.log('Task 1')

// const text = "learning file system";
// fs.writeFileSync('./hello.txt', text);

// console.log('Task 3')

// const data = fs.readFileSync('./hello.txt', { encoding: "utf-8" });
// console.log(data);

// console.log('Task 4');

// const fs = require('fs');
console.log('Task 1');
let text = "Node JS";
fs.readFile('./hello.txt', { encoding: "utf-8" }, (err, data) => {
    if (err) {
        console.log('Somthing went wrong', err)
        return
    }
    text = data;
    console.log(text)
});

fs.writeFile('./hello.txt', text, { encoding: "utf-8" }, err => {
    if (err) {
        console.log('Error found', err)
        return
    }
    console.log('successfully modified')
})


// console.log(text)
console.log('Task 3')





