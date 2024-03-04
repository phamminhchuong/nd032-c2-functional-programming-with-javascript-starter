const promise1 = () => new Promise((resolve, reject) => {
    setTimeout(resolve, 3000, 5);
})

const promise2 = () => new Promise((resolve, reject) => {
    setTimeout(resolve, 3000, 6);
})


async function handleManyThing(){
    // let value1 = await promise1();
    // console.log('waiting promise1 ', value1);
    // let value2 = await promise2();
    // console.log('waiting promise2 ', value2);

    // console.log('solution ', value1 + value2);

    Promise.allSettled([promise1, promise2])
    .then(results => {
        console.log(results)
        results.forEach(result => console.log(result.value))
    })
    
}

handleManyThing()