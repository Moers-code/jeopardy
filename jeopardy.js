let categories = [];


getCategoryIds= async () => {
    try {
        const res = await axios.get('https://jservice.io/api/categories?count=100');
        const categoryId = res.data.filter(obj => obj.clues_count > 4).map(filtered => filtered.id);
        const NUM_CATEGORIES = _.sampleSize(categoryId, 6);
        return NUM_CATEGORIES;
    } catch (err) {
        console.log(err);
    }
}


getCategory = async (catId) => {
    let idArr = await(catId);

    try{
        for (let i = 0; i < idArr.length; i++) {
            let genre = idArr[i]
            let res = await axios.get(`https://jservice.io/api/category?id=${genre}`);
            
            let {title, clues} = res.data;
            let cluesArray = _.sampleSize(clues.map((clue) => ({
                id: clue.id,
                answer: clue.answer,
                question: clue.question,
                showing: null
            })
            ), 6);
            categories.push({title,cluesArray});
        }

    }catch(err){
        console.log(err)
    }
    
    return categories
}


const fillTable = async () => {
    
    
    const $board = $('#board');
    const $headings = $("<thead>");
    const $tbody = $("<tbody>");
    const content = await getCategory(getCategoryIds());
    $headings.append($("<tr class='category-titles'></tr>").append(content.map(el => $("<th>").text(el.title))));
  
    
    for(let j = 0; j < content.length - 1 ; j++){
        let $tr = $("<tr>")
        for(let k = 0; k < content[j].cluesArray.length; k++){
            $tr.append($("<td>?</td>").attr("id", `${content[j].cluesArray[k].id}`))
        }
        $tbody.append($tr)
        }
    $board.append($headings, $tbody);
    $("#board tbody").on('click', handleClick);
   };


/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

handleClick = async (evt) => {
    const content = await getCategory(getCategoryIds());

    for(let {title, cluesArray} of content){
        console.log(cluesArray)
    }
    
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    // how to show loading spinner
    // game board .empty()
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO