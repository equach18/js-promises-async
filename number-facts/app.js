const baseURL = "http://numbersapi.com";


// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the ***json*** query key, specific to this API. [Details](http://numbersapi.com/#json).
async function getNumFact(num){
    let fact = await axios.get(`${baseURL}/${num}?json`);
    console.log(fact.data);
}
const favNum = 8;
getNumFact(favNum);


// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.
async function getMoreNumFacts(nums){
    let facts = await axios.get(`${baseURL}/${nums}?json`)
    console.log(facts.data)
}
const favNums = [3, 4, 8, 11];
getMoreNumFacts(favNums);


// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
    
//     *(Note: You’ll need to make multiple requests for this.)*

async function getFactsAboutNum(num){
    let facts = await Promise.all(
        Array.from({ length: 4 }, () => axios.get(`${baseURL}/${num}?json`))
    )
    facts.forEach((fact) => {
        $("body").append(`<p>${fact.data.text}</p>`);
      });
}
getFactsAboutNum(favNum)