const fs = require('fs');

fs.readFile("vocab.csv", "utf8", (err, data) => {
  if (err) throw err;

  const arr = data.split('\n');
  const jsonObj = [];
  const headers = arr[0].split(',');

  for (let i = 1; i < arr.length; i++) {
    const contents = arr[i].split(',');
    const left = contents.slice(0, 2);
    const right = [contents.slice(2).join(",").trim()];
    const objData = left.concat(right);
    const obj = {};

    for (let j = 0; j < objData.length; j++) {
      obj[headers[j].trim()] = objData[j].trim();
    }

    jsonObj.push(obj);
  }

  fs.writeFile("vocab.json", JSON.stringify(jsonObj), "utf8", err => {
    if (err) throw err;
    console.log(`Saved.`);
  });
});