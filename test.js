const strToArr = (array) => {
    let objsArr = [];
    let finalOutput =[];
    for (const arr of array) {
        const obj = arr.split(':');
        // console.log([obj]);
         objsArr.push(obj)
    }
    // console.log('obj arr is:>',objsArr)
    for(const obj of objsArr){
        // console.log(obj);
        const data = {
            title: obj[0],
            details:obj[1]
        }
        // console.log(data)
        finalOutput.push(data)
        // return true;
    }
    const result = JSON.stringify(finalOutput)
    return result;
}
// const arr = [
//     "Material and Comfort: Made from soft, breathable cotton or Dri-FIT polyester blends, wicking sweat to keep you dry during workouts or casual wear.",
//     "Design Options: Available in various styles like crew neck, V-neck, or graphic tees with iconic Nike Swoosh logos, in sizes S–XXL and multiple colors.",
//     "Durability: Features reinforced stitching and high-quality fabrics to withstand frequent washing and intense physical activity."
// ]


const arr = [
          "Traction: Equipped with a rugged rubber outsole with aggressive lugs for enhanced grip on uneven trails and wet surfaces.",
          "Cushioning: Features AVIA’s Cantilever System for shock absorption and heel support, reducing impact during runs.",
          "Breathability: Constructed with mesh uppers to promote airflow, keeping feet cool and dry during outdoor activities."
        ]

const result = strToArr(arr);
console.log(result);