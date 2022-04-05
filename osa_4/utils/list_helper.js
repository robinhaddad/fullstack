const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0
    blogs.forEach(blog =>
        likes += blog.likes);
    return likes
}

const favoriteBlog = (blogs) => {
    let mostLikes = blogs[0].likes
    let currentLikes = 0
    let foundValue = 0
    for(let i=0;i<blogs.length;i++){
        currentLikes = blogs[i].likes

        if(currentLikes>mostLikes){
            mostLikes=currentLikes
            foundValue = i
        }
    }
    return blogs[foundValue]
}

const mostBlogs = (blogs) => {
    let mostLikes = blogs[0].likes
    let currentLikes = 0
    let foundValue = 0
    for(let i=0;i<blogs.length;i++){
        currentLikes = blogs[i].likes

        if(currentLikes>mostLikes){
            mostLikes=currentLikes
            foundValue = i
        }
    }
    return blogs[foundValue]
}

const mostLikes = (blogs) => {

    //ota ylös kaikki authorit
    //tutki alkuperäinen array näiden authorien avulla
    //ja ota liket ylös

    //jos arrayssä on jo tietty author, ei sinne saisi lisätä
    //samaa uudestaan
    let nameArray = []
    for (let i=0;i<blogs.length;i++){
        nameArray[i]=blogs[i].author
    }
    console.log(nameArray)

    let uniqArray = [...new Set(nameArray)];
    console.log("uniqArray",uniqArray)

    let finalArray = []

    //if i just count all the likes?...
    for(let i=0; i<uniqArray.length;i++){

    }

    return null
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostLikes
}