get array of category IDs through: https://jservice.io/api/categories?count=100 

if "clues_count" are more than 4 push to the IDs array



randomly select 6 categories using lodash


get 5 clues from each category :  https://jservice.io/api/category?id=6
    how: maybe use lodash on "clues" to sample 5 objects


load the board with categories: th = "title
                                tds = "answer" & "question"
                                maybe assign the clues id to the td in order to reference it for further actions

one click turns to the question

the second click turns the answer