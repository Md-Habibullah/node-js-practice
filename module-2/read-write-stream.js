
// fs.readFile('./hello-world.txt', { encoding: "utf-8" }, (err, data) => {
//     if (err) {
//         console.log('Somthing went wrong', err)
//         return
//     }
//     fs.writeFile('./hello.txt', data, { encoding: "utf-8" }, err => {
//         if (err) {
//             console.log('Error found', err)
//             return
//         }
//         console.log('successfully modified')
//     })
// });

const fs = require('fs');
const readStream = fs.createReadStream('./hello-world.txt', { encoding: "utf-8" })
const writeStream = fs.createWriteStream('./hello.txt', { encoding: "utf-8" })

readStream.on("data", (data) => {
    // console.log(data)
    writeStream.write(data, err => {
        if (err) {
            throw Error("Error happen", err)
        }
    })
});
// error handle for readstream
readStream.on("error", err => {
    if (err) {
        throw Error("Error happen", err)
    }
});
// error handle for writestream
writeStream.on("error", err => {
    if (err) {
        throw Error("Error happen", err)
    }
})

// take action after end
readStream.on("end", () => {
    console.log('Successfully ended reading');
    writeStream.end();
})

// handle finish on writestream
writeStream.on("finish", () => {
    console.log('Written is finish')
});