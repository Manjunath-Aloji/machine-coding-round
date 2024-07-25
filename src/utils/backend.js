import courses from "./courses";
import batches from "./batches";

function getBatches (offSet=0, limit, searchValue='') {
    console.log(offSet, limit);
    const Data = batches.map(batch => {
        const course = courses.find(course => course.id === batch.courseId);
        return {
            ...batch,
            course: course || {}
        };
    })
    let count = Data.length
    let paginatedData = []
    if (searchValue) {
        paginatedData = Data.filter(item => item.course.name.toLowerCase().includes(searchValue.toLowerCase()))
        count = paginatedData.length
        paginatedData = paginatedData.splice(offSet, limit)
    } else {
        paginatedData = Data.splice(offSet, limit)
    }
    return {data : paginatedData, count}
}

export {
    getBatches
}