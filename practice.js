/**
 * 1. api - fetch()
 * 2. forEach
 * 3. map
 * 4. join()
 * 5. push()
 * 6. filter()
 * 7. find()
 */

//---------------------❌❌ array of object ❌❌ -----------------------------
const data = [
  {
    title: "'Apple Mobile'",
    id: 'c3r4',
    createdAt: '2025-09-04T12',
  },
  {
    title: "'Samsung Mobile'",
    id: 'u3rl',
    createdAt: '2025-09-04T13',
  },
  {
    title: "'Redmi Mobile'",
    id: 'h1wf',
    createdAt: '2025-09-04T14',
  },
  {
    title: "'Oppo Mobile'",
    id: 'q7gp',
    createdAt: '2025-09-04T15',
  },
];

//---------------------⚡ for loop

// for (let i = 0; i < data.length; i++) {
//   //   console.log(data[i]);
// }

//---------------------⚡ for of
// for (let d of data) {
//   console.log(d);
// }

//---------------------⚡ forEach
// data.forEach((d) => {
//   console.log(d);
// });

//---------------------❌❌ map ❌❌ -----------------------------

// const titleArr = data.map((d) => {
//   return `<span>${d.title}</span>`;
// });
// console.log(titleArr);

//---------------------⚡uprer code er short form
// const titleArr = data.map((d) => `<span>${d.title}</span>`);
// console.log(titleArr);

//---------------------⚡uporer array of object থেকে createdAt বাদ দিতে
// const updatedData = data.map(({ createdAt, ...rest }) => rest);
// console.log(updatedData);

//---------------------❌❌ join() ❌❌ -----------------------------
// const arr = ['hello', 'tumi', 'kmn-aso'];
// console.log(arr.join('_'));

//---------------------❌❌ push() ❌❌ -----------------------------
// data.push(10);
// data.push({
//   title: 'this is a title',
// });
// console.log(data);

//---------------------❌❌ filter() ❌❌ -----------------------------

//---------------------⚡number diye
// const arr = [1, 2, 3, 3, 3, 4, 5, 6, 7];
// const filteredArray = arr.filter((num) => num !== 3);
// console.log(filteredArray);

//---------------------⚡uporer array of object
// const filteredData = data.filter((d) => d.id !== 'c3r4');
// console.log(filteredData);

//---------------------❌❌ find() ❌❌ -----------------------------
// const foundData = data.find((d) => d.id === 'c3r4');
// //---------------------⚡ one Element return kore
// //---------------------⚡ undefined === falsy ---- false
// //---------------------⚡ jodi pawa jay === truthy
// console.log(foundData);

// //---------------------⚡truthy & falsy
// if (foundData) {
//   console.log('pawa gece', true);
// } else {
//   console.log('Pawa jayni', false);
// }

//---------------------❌❌ script.js এর add categories কিভাবে করছে তা বুঝালো ❌❌ -----------------------------
// const arr = ['hello', 'hi', 'dhjdgh']
// let container = ""

// arr.forEach(a => {
//  // container += a
//   container =  container + `<span>${a}</span>`;
// })

// console.log(container)
