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

// returns categories array having 6 objects
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
    $headings.append($("<tr class='category-titles'></tr>").append(categories.map(el => $("<th>").text(el.title.toUpperCase()))));
    
    // creates 5 tbody rows
    for(let  i = 0; i < 5 ;  i++){
        let $tr = $("<tr>");

        // fills tds with ?
        for(let j = 0; j < clues.length; j++){
            $tr.append($("<td>?</td>").attr("id", `${clues[j][i]['id']}`))
        }
        $tbody.append($tr)
        }
    $board.append($headings, $tbody);

   };

handleClick = async (evt) => {

    const clickedClueId = Number(evt.target.id);
    const categoryWithClue = categories.find(category =>
      category.cluesArray.some(clue => clue.id === clickedClueId)
    );
  
    if (!categoryWithClue) {
      return;
    }
  
    const clickedClue = categoryWithClue.cluesArray.find(clue => clue.id === clickedClueId);
    
    if (clickedClue.showing === null) {
      $(evt.target).text(clickedClue.question);
      clickedClue.showing = 'question';
    } else if (clickedClue.showing === 'question') {
      $(evt.target).text(clickedClue.answer);
      clickedClue.showing = 'answer';
    }
  }; 

const showLoadingView = () => {
    $('table').empty();
    $("#spinner").css({"display": "block", "animation-play-state": "running !important"});
    
};

const hideLoadingView = () => {
    $("#spinner").css({"display": "none", "animation-play-state": "paused !important"});
    $('#start-game').text('Restart Game');
};


const setupAndStart = async() => {
    categories = [];
    showLoadingView();
    await fillTable();
    hideLoadingView();
};

$("#start-game").on('click', setupAndStart);
$("#board").on('click', handleClick);