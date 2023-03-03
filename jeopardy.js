let categories = [];

// gets 6 random category ids and returns them in an array
getCategoryIds= async () => {
    try {
        const res = await axios.get('https://jservice.io/api/categories?count=100');
        const categoryId = res.data.filter(obj => obj.clues_count > 5).map(filtered => filtered.id);
        const NUM_CATEGORIES = _.sampleSize(categoryId, 6);
        return NUM_CATEGORIES;
    } catch (err) {
        console.log(err);
    }
}

// returns categories array having 6 objects like: {title: 'all numbers', cluesArray: Array(6)}
// where cluesArray has 6 objects like: {id: 298, answer: '640', question: 'The number of acres in a square mile', showing: null}
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
            ), 5);
            
            categories.push({title,cluesArray});
        }

    }catch(err){
        console.log(err)
    }
    return categories
}


const fillTable = async () => {
    await getCategory(getCategoryIds());
    
    const $board = $('#board');
    const $headings = $("<thead>");
    const $tbody = $("<tbody>");
    const clues = categories.map(cat => cat.cluesArray);
 
    // fills Titles in the thead
    $headings.append($("<tr class='category-titles'></tr>").append(categories.map(el => $("<th>").text(el.title))));
    
    // creates 5 tbody rows
    for(let  i = 0; i < categories.length -1 ;  i++){
        let $tr = $("<tr>");

        // fills tds with ?
        for(let j = 0; j < clues.length; j++){
            $tr.append($("<td>?</td>").attr("id", `${clues[j][i]['id']}`))
        }
        $tbody.append($tr)
        }
    $board.append($headings, $tbody);
   };


/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

handleClick = async (evt) => {
    
    console.log(evt.target);

    // for(let {title, cluesArray} of content){
    //     for(let indClues of cluesArray){
    //         let {id, question, answer, showing} = indClues;
    //         console.log('1- id: ' + id, "2- question: " + question,'3- answer: ' + answer);

    //         if(!showing){
    //             $(this).text(question);
    //             showing = 'question';
    //         } else if (showing === 'question'){
    //             evt.target.text(answer);
    //             showing = 'answer';
    //         } else {
    //             return; //should remove event listener
    //         }
    //     }
    // }
}
$("#board").on('click', handleClick);
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